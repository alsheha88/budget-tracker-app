import { prisma } from "../../../lib/prisma.js";
import { getCurrentPeriod } from "../../../lib/utility.js";
import { dbGetRecentTransactions } from "../transaction/transactions.js";

export const dbGetGoalsSaved = async (userId: string) => {
	const [goals, goalsSavings] = await Promise.all([
		prisma.savings.findMany({ where: { userId } }),
		prisma.transaction.groupBy({
			by: ["savingsId"],
			where: { userId, savingsId: { not: null } },
			_sum: { amount: true },
		}),
	]);

	const savings = goals.map((goal) => {
		const match = goalsSavings.find((s) => s.savingsId === goal.id);
		const saved = match?._sum.amount ? -match._sum.amount.toNumber() : 0;
		return {
			...goal,
			saved,
			remaining: goal.target.toNumber() - saved,
			percent: (saved / goal.target.toNumber()) * 100,
		};
	});

	return savings;
};

export const dbGetSavingsPageStats = async (userId: string) => {
	const savings = await dbGetGoalsSaved(userId);
	const totalTarget = savings.reduce(
		(acc, s) => (acc += s.target.toNumber()),
		0,
	);
	const totalSaved = savings.reduce((acc, s) => (acc += s.saved), 0);
	const percent = totalTarget ? (totalSaved / totalTarget) * 100 : 0;

	return {
		savings,
		summary: {
			totalSaved,
			totalTarget,
			percent,
		},
	};
};
export const dbGetAccountBalance = async (userId: string) => {
	const [accounts, accountBalance] = await Promise.all([
		prisma.account.findMany({ where: { userId } }),
		prisma.transaction.groupBy({
			by: ["accountId"],
			where: { userId },
			_sum: { amount: true },
		}),
	]);

	const accountStats = accounts.map((account) => {
		const match = accountBalance.find((a) => a.accountId === account.id);
		const transactionSum = match?._sum?.amount
			? match._sum.amount.toNumber()
			: 0;
		return {
			...account,
			transactionSum,
			balance: account.startingBalance.toNumber() + transactionSum,
		};
	});

	return accountStats;
};
export const dbGetBudgetProgress = async (userId: string) => {
	const budgets = await prisma.budget.findMany({ where: { userId } });

	const budgetStats = await Promise.all(
		budgets.map(async (budget) => {
			const { startDate, endDate } = getCurrentPeriod(budget.period);
			const results = await prisma.transaction.aggregate({
				where: {
					userId,
					categoryId: budget.categoryId,
					date: { gte: startDate, lte: endDate },
				},
				_sum: { amount: true },
			});
			const spent = results?._sum.amount ? -results._sum.amount.toNumber() : 0;
			const remaining = budget.limit.toNumber() - spent;
			return {
				...budget,
				spent: spent,
				remainingBalance: remaining,
				percent: (spent / budget.limit.toNumber()) * 100,
			};
		}),
	);

	return budgetStats;
};

export const dbGetTransactionStats = async (userId: string) => {
	const { startDate, endDate } = getCurrentPeriod("monthly");
	const [incomeTransactions, expensesTransactions] = await Promise.all([
		prisma.transaction.aggregate({
			where: {
				userId,
				type: { equals: "Income" },
				date: { gte: startDate, lte: endDate },
			},
			_sum: { amount: true },
		}),
		prisma.transaction.aggregate({
			where: {
				userId,
				type: { equals: "Expense" },
				date: { gte: startDate, lte: endDate },
			},
			_sum: { amount: true },
		}),
	]);

	const totalIncome = incomeTransactions._sum.amount
		? incomeTransactions._sum.amount?.toNumber()
		: 0;
	const totalExpenses = expensesTransactions._sum.amount
		? -expensesTransactions._sum.amount.toNumber()
		: 0;
	const netBalance = totalIncome - totalExpenses;

	return {
		income: totalIncome,
		expenses: totalExpenses,
		balance: netBalance,
	};
};

export const dbGetBillsStats = async (userId: string) => {
	const { startDate: monthStart, endDate: monthEnd } =
		getCurrentPeriod("monthly");
	const now = new Date();
	const in7Days = new Date();
	in7Days.setDate(in7Days.getDate() + 7);

	const [monthlyBillsTotal, upcomingBills, paidBills, overdueBills] = await Promise.all([
		prisma.bill.aggregate({
			where: { userId, dueDate: { gte: monthStart, lte: monthEnd } },
			_sum: { amount: true },
		}),
		prisma.bill.aggregate({
			where: {
				userId,
				dueDate: { gte: now, lte: in7Days },
				paidAt: null,
			},
			_sum: { amount: true },
		}),
		prisma.bill.aggregate({
			where: { userId, paidAt: { gte: monthStart, lte: monthEnd } },
			_sum: { amount: true },
		}),
		prisma.bill.aggregate({
			where: { userId, dueDate: { lt: now }, paidAt: null },
			_sum: { amount: true },
		}),
	]);

	return {
		monthlyBills: monthlyBillsTotal._sum.amount?.toNumber() ?? 0,
		upcomingWeeklyBills: upcomingBills._sum.amount?.toNumber() ?? 0,
		paidBills: paidBills._sum.amount?.toNumber() ?? 0,
		overdueBills: overdueBills._sum.amount?.toNumber() ?? 0,
	};
};

export const dbGetAccountStats = async (userId: string) => {
	const accountStats = await dbGetAccountBalance(userId);

	const total = accountStats.reduce((acc, b) => (acc += b.balance), 0);
	const assets = accountStats.filter(
		(acc) =>
			acc.accountType === "cash" ||
			acc.accountType === "checking" ||
			acc.accountType === "investment" ||
			acc.accountType === "savings",
	);
	const liabilities = accountStats.filter(
		(acc) => acc.accountType === "loan" || acc.accountType === "credit",
	);
	const totalAssets = assets.reduce((acc, b) => (acc += b.balance), 0);
	const totalLiabilities = liabilities.reduce(
		(acc, b) => (acc -= b.balance),
		0,
	);

	return {
		accounts: accountStats,
		summary: { total, totalAssets, totalLiabilities },
	};
};

export const dbGetSavingsStats = async (userId: string) => {
	const savings = await dbGetGoalsSaved(userId);
	const { startDate, endDate } = getCurrentPeriod("monthly");
	const { income } = await dbGetTransactionStats(userId);
	const contribution = await prisma.transaction.aggregate({
		where: {
			userId,
			savingsId: { not: null },
			date: { gte: startDate, lte: endDate },
		},
		_sum: { amount: true },
	});
	const now = new Date();
	const totalSaved = savings.reduce((acc, s) => (acc += s.saved), 0);
	const monthlySavings = contribution._sum.amount
		? -contribution._sum.amount.toNumber()
		: 0;
	const monthlySavingsRate = income ? (monthlySavings / income) * 100 : 0;
	const actualSavingsProgress = savings
		.map((s) => {
			return {
				monthsPassed: Math.max(
					(now.getFullYear() - s.createdAt.getFullYear()) * 12 +
						(now.getMonth() - s.createdAt.getMonth()),
					1,
				),
				saved: s.saved,
				monthlyContribution: s.monthlyContribution?.toNumber() ?? 0,
			};
		})
		.filter((s) => s.saved / s.monthsPassed >= s.monthlyContribution);

	return {
		totalSaved,
		monthlySavingsRate,
		onTrackCount: actualSavingsProgress.length,
	};
};

export const dbGetBudgetStats = async (userId: string) => {
	const budgetStats = await dbGetBudgetProgress(userId);
	const totalAllocated = budgetStats.reduce(
		(acc, b) => (acc += b.limit.toNumber()),
		0,
	);
	const spentBudget = budgetStats.reduce((acc, b) => (acc += b.spent), 0);
	const remaining = budgetStats.reduce(
		(acc, b) => (acc += b.remainingBalance),
		0,
	);
	const overAllUsageRate = (spentBudget / totalAllocated) * 100 || 0;
	const budgetHealthRate = Math.max(100 - overAllUsageRate, 0);

	return {
		totalAllocated,
		spentBudget,
		remaining,
		overAllUsageRate,
		budgetHealthRate,
		budgetStats,
	};
};

export const dbGetHistoricalTransactions = async (userId: string) => {
	const sixMonthsAgo = new Date();
	sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
	const transactions = await prisma.$queryRaw<
		Array<{ month: Date; income: number; expense: number }>
	>`
    SELECT 
    DATE_TRUNC('month', date) AS month,
    SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) AS income,
    SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS expense
    FROM "Transaction" WHERE "userId" = ${userId} AND date >= ${sixMonthsAgo} 
    GROUP BY DATE_TRUNC('month', date)
    ORDER BY month
    
    `;
	let transactionsHistory: Array<{
		month: Date;
		income: number;
		expense: number;
	}> = [];

	for (let i = 0; i <= 5; i++) {
		const today = new Date();
		const month = today.setMonth(today.getMonth() - i);
		const dateMonth = new Date(month);
		const match = transactions.find(
			(t) =>
				t.month.getFullYear() === dateMonth.getFullYear() &&
				t.month.getMonth() === dateMonth.getMonth(),
		);

		transactionsHistory.push({
			month: dateMonth,
			income: match ? Number(match.income) : 0,
			expense: match ? -Number(match.expense) : 0,
		});
	}

	return transactionsHistory;
};

export const dbGetSpendingByCategroy = async (userId: string) => {
	const { startDate, endDate } = getCurrentPeriod("monthly");

	const [transactionsSumByCategory, expensesByCategory] = await Promise.all([
		prisma.transaction.groupBy({
			by: ["categoryId"],
			where: {
				userId,
				categoryId: { not: null },
				type: "Expense",
				date: { gte: startDate, lte: endDate },
			},
			_sum: { amount: true },
		}),

		prisma.category.findMany(),
	]);

	const spendingByCategory = expensesByCategory
		.map((t) => {
			const match = transactionsSumByCategory.find(
				(c) => c.categoryId === t.id,
			);
			const amount = match?._sum.amount ? -match?._sum.amount.toNumber() : 0;
			return {
				categoryId: match?.categoryId,
				name: t.name,
				color: t.color,
				amount: amount,
			};
		})
		.filter((t) => t.amount > 0);

	const sortSpending = spendingByCategory.sort((a, b) => b.amount - a.amount);
	const total = sortSpending.reduce((acc, b) => (acc += b.amount), 0);
	const topFiveCategories = sortSpending.slice(0, 5).map((t) => {
		return {
			name: t.name,
			color: t.color,
			amount: t.amount,
			percent: (t.amount / total) * 100,
		};
	});
	const otherCategories = sortSpending
		.slice(5)
		.reduce((acc, b) => (acc += b.amount), 0);

	return {
		topFiveCategories,
		otherCategories: {
			name: "Others",
			amount: otherCategories,
			percent: (otherCategories / total) * 100,
		},
	};
};

export const dbGetDashboardStats = async (userId: string) => {
	const [
		accounts,
		transactions,
		recentTransactions,
		budgetStats,
		savingsStats,
		cashFlow,
		spendingByCategory,
	] = await Promise.all([
		dbGetAccountStats(userId),
		dbGetTransactionStats(userId),
		dbGetRecentTransactions(userId),
		dbGetBudgetProgress(userId),
		dbGetGoalsSaved(userId),
		dbGetHistoricalTransactions(userId),
		dbGetSpendingByCategroy(userId),
	]);
	const { summary } = accounts;
	const { income, expenses, balance } = transactions;

	return {
		accountsSummary: summary,
		transactionsStats: {
			income,
			expenses,
			balance,
		},
		recentTransactions,
		budgetStats,
		savingsStats,
		cashFlow,
		spendingByCategory,
	};
};
