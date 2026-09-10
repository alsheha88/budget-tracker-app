// ============================================================
// Enums (from Prisma schema — as string unions, client-safe)
// ============================================================
export type AccountType =
	| "cash"
	| "checking"
	| "savings"
	| "credit"
	| "investment"
	| "loan";

export type TransactionType = "Income" | "Expense" | "Transfer";

export type Period = "weekly" | "monthly" | "yearly";

export type Priority = "high" | "medium" | "low";

// ============================================================
// Shared sub-shapes
// ============================================================
export type Category = {
	id: string;
	name: string;
	color: string;
};

export type Account = {
	id: string;
	userId: string;
	name: string;
	accountType: AccountType;
	startingBalance: string; // Decimal → string over JSON
	createdAt: string; // Date → string over JSON
	updatedAt: string;
};

export type Transaction = {
	category: Category | null;
	account: Account;
	id: string;
	merchant: string;
	description: string | null;
	type: TransactionType;
	amount: string; // Decimal → string
	date: string; // Date → string
	isRecurring: boolean;
	notes: string | null;
	categoryId: string | null;
	userId: string;
	billId: string | null;
	accountId: string;
	budgetId: string | null;
	transferGroupId: string | null;
	savingsId: string | null;
};

// ============================================================
// Dashboard
// ============================================================
export type DashboardStats = {
	accountsSummary: {
		total: number;
		totalAssets: number;
		totalLiabilities: number;
	};
	transactionsStats: {
		income: number;
		expenses: number;
		balance: number;
	};
	recentTransactions: Transaction[];
	budgetStats: BudgetStat[];
	savingsStats: SavingsGoal[];
	cashFlow: {
		month: string; // Date → string
		income: number;
		expense: number;
	}[];
	spendingByCategory: {
		topFiveCategories: {
			name: string;
			color: string;
			amount: number;
			percent: number;
		}[];
		otherCategories: {
			name: string;
			amount: number;
			percent: number;
		};
	};
};

// ============================================================
// Transactions
// ============================================================
export type TransactionsResponse = {
	transactions: Transaction[];
	count: number;
	page: number;
	limit: number;
	totalPages: number;
};

// ============================================================
// Accounts
// ============================================================
export type AccountStat = Account & {
	transactionSum: number;
	balance: number;
	transactionDate: string | null; // Date | null → string | null
};

export type AccountStatsResponse = {
	accounts: AccountStat[];
	summary: {
		total: number;
		totalAssets: number;
		totalLiabilities: number;
	};
};

// ============================================================
// Savings
// ============================================================
export type SavingsGoal = {
	id: string;
	name: string;
	description: string | null;
	target: string; // Decimal → string
	monthlyContribution: string | null; // Decimal | null → string | null
	createdAt: string;
	updatedAt: string;
	targetDate: string | null; // Date | null → string | null
	color: string;
	priority: Priority;
	userId: string;
	saved: number;
	remaining: number;
	percent: number;
};

export type SavingsResponse = {
	savings: SavingsGoal[];
	summary: {
		totalSaved: number;
		totalTarget: number;
		percent: number;
	};
};

// ============================================================
// Budgets
// ============================================================
export type BudgetStat = {
	id: string;
	name: string;
	limit: string; // Decimal → string
	categoryId: string;
	userId: string;
	notes: string | null;
	period: Period;
	startDate: string; // Date → string
	createdAt: string;
	updatedAt: string;
	rollover: boolean;
	alertThreshold: number;
	spent: number;
	remainingBalance: number;
	percent: number;
};

export type BudgetsStatsResponse = {
	totalAllocated: number;
	spentBudget: number;
	remaining: number;
	overAllUsageRate: number;
	budgetHealthRate: number;
	budgetStats: BudgetStat[];
};

// ============================================================
// Bills
// ============================================================
export type Bill = {
	id: string;
	name: string;
	provider: string;
	amount: string; // Decimal → string
	dueDate: string; // Date → string
	paidAt: string | null; // Date | null → string | null
	frequency: Period;
	notes: string | null;
	userId: string;
	accountId: string | null;
	categoryId: string | null;
};

export type BillsStatsRespoonse = {
	bills: Bill[];
	summary: {
		monthlyBills: number;
		upcomingWeeklyBills: number;
		paidBills: number;
		overdueBills: number;
	};
};







