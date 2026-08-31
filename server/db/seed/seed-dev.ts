// seed-dev.ts
// Realistic dev dataset for a single test user across all models.
// Run:  npx tsx db/seed/seed-dev.ts   (adjust path to wherever you place it)
//
// Safe to re-run: it deletes this user's existing transactions/budgets/
// savings/bills/accounts first, then reseeds. Categories are left alone
// (they're seeded separately and referenced by name here).

import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

const USER_ID = "94ebc7fb-a3e7-455d-ba09-a336eca41ad8";

// ---- helpers ---------------------------------------------------------------

/** A date `monthsAgo` months back from now, on `day` of that month. */
function monthsAgo(months: number, day = 15): Date {
	const d = new Date();
	d.setMonth(d.getMonth() - months);
	d.setDate(day);
	d.setHours(12, 0, 0, 0);
	return d;
}

/** A date `daysFromNow` from now (negative = past). */
function daysFromNow(days: number): Date {
	const d = new Date();
	d.setDate(d.getDate() + days);
	d.setHours(12, 0, 0, 0);
	return d;
}

function money(n: number): Prisma.Decimal {
	return new Prisma.Decimal(n.toFixed(3));
}

// ---- main ------------------------------------------------------------------

async function main() {
	// 0. Sanity: user must exist
	const user = await prisma.user.findUnique({ where: { id: USER_ID } });
	if (!user) {
		throw new Error(
			`User ${USER_ID} not found. Sign up / seed the user first.`,
		);
	}

	// 1. Load categories (seeded separately) into a name -> id map
	const categories = await prisma.category.findMany();
	if (categories.length === 0) {
		throw new Error("No categories found. Run the category seed first.");
	}
	const cat: Record<string, string> = {};
	for (const c of categories) cat[c.name] = c.id;

	const need = (name: string): string => {
		const id = cat[name];
		if (!id)
			throw new Error(`Missing category "${name}" — seed categories first.`);
		return id;
	};

	// 2. Clean this user's existing data (order respects FKs)
	//    Transactions reference accounts/budgets/savings/bills, so go first.
	await prisma.transaction.deleteMany({ where: { userId: USER_ID } });
	await prisma.budget.deleteMany({ where: { userId: USER_ID } });
	await prisma.savings.deleteMany({ where: { userId: USER_ID } });
	await prisma.bill.deleteMany({ where: { userId: USER_ID } });
	await prisma.account.deleteMany({ where: { userId: USER_ID } });

	// 3. Accounts
	const nbk = await prisma.account.create({
		data: {
			userId: USER_ID,
			name: "NBK Checking",
			accountType: "checking",
			startingBalance: money(2500),
		},
	});
	const boubyan = await prisma.account.create({
		data: {
			userId: USER_ID,
			name: "Boubyan Savings",
			accountType: "savings",
			startingBalance: money(8000),
		},
	});
	const kfh = await prisma.account.create({
		data: {
			userId: USER_ID,
			name: "KFH Credit",
			accountType: "credit",
			startingBalance: money(0),
		},
	});
	const cash = await prisma.account.create({
		data: {
			userId: USER_ID,
			name: "Cash",
			accountType: "cash",
			startingBalance: money(300),
		},
	});

	// 4. Savings goals (varied progress: near-complete, mid, just-started)
	const emergency = await prisma.savings.create({
		data: {
			userId: USER_ID,
			name: "Emergency Fund",
			description: "6 months of expenses",
			target: money(6000),
			monthlyContribution: money(500),
			targetDate: daysFromNow(120),
			color: "#10B981",
			priority: "high",
			createdAt: monthsAgo(6, 1),
		},
	});
	const vacation = await prisma.savings.create({
		data: {
			userId: USER_ID,
			name: "Summer Vacation",
			description: "Trip abroad",
			target: money(2000),
			monthlyContribution: money(300),
			targetDate: daysFromNow(90),
			color: "#3B82F6",
			priority: "medium",
			createdAt: monthsAgo(4, 1),
		},
	});
	const car = await prisma.savings.create({
		data: {
			userId: USER_ID,
			name: "New Car Downpayment",
			description: "Downpayment fund",
			target: money(8000),
			monthlyContribution: money(600),
			targetDate: daysFromNow(365),
			color: "#F59E0B",
			priority: "low",
			createdAt: monthsAgo(2, 1),
		},
	});

	// 5. Budgets (monthly; include one that will be OVER, one NEAR, some healthy)
	//    unique([userId, categoryId, period]) — one budget per category+period.
	const budgetGroceries = await prisma.budget.create({
		data: {
			userId: USER_ID,
			name: "Groceries",
			categoryId: need("groceries"),
			limit: money(200),
			period: "monthly",
			alertThreshold: 75,
			startDate: monthsAgo(0, 1),
		},
	});
	const budgetDining = await prisma.budget.create({
		data: {
			userId: USER_ID,
			name: "Dining",
			categoryId: need("dining"),
			limit: money(100),
			period: "monthly",
			alertThreshold: 80,
			startDate: monthsAgo(0, 1),
		},
	});
	const budgetTransport = await prisma.budget.create({
		data: {
			userId: USER_ID,
			name: "Transport",
			categoryId: need("transport"),
			limit: money(100),
			period: "monthly",
			alertThreshold: 80,
			startDate: monthsAgo(0, 1),
		},
	});
	const budgetEntertainment = await prisma.budget.create({
		data: {
			userId: USER_ID,
			name: "Entertainment",
			categoryId: need("entertainment"),
			limit: money(200),
			period: "monthly",
			alertThreshold: 80,
			startDate: monthsAgo(0, 1),
		},
	});

	// 6. Bills (some paid, some upcoming, one overdue-ish)
	await prisma.bill.createMany({
		data: [
			{
				userId: USER_ID,
				name: "Electricity (MEW)",
				provider: "Ministry of Electricity",
				amount: money(28.4),
				dueDate: daysFromNow(5),
				frequency: "monthly",
				categoryId: need("bills"),
				accountId: nbk.id,
			},
			{
				userId: USER_ID,
				name: "Netflix",
				provider: "Netflix",
				amount: money(4.5),
				dueDate: daysFromNow(12),
				frequency: "monthly",
				categoryId: need("subscription"),
				accountId: boubyan.id,
			},
			{
				userId: USER_ID,
				name: "Ooredoo Internet",
				provider: "Ooredoo",
				amount: money(15),
				dueDate: daysFromNow(-2),
				frequency: "monthly",
				categoryId: need("bills"),
				accountId: nbk.id,
			},
			{
				userId: USER_ID,
				name: "Gym Membership",
				provider: "Fitness First",
				amount: money(35),
				dueDate: daysFromNow(-10),
				paidAt: daysFromNow(-9),
				frequency: "monthly",
				categoryId: need("fitness"),
				accountId: nbk.id,
			},
		],
	});

	// 7. Transactions — the bulk. Spread across the last 6 months so the
	//    cash-flow chart has data. Signed amounts (expense negative, income
	//    positive, transfer/contribution negative on source).

	type TxSeed = {
		merchant: string;
		amount: number; // POSITIVE here; sign applied by type below
		type: "Income" | "Expense" | "Transfer";
		category?: string; // category name (omit for transfers/contributions)
		account: string; // account id
		date: Date;
		savingsId?: string;
		transferGroupId?: string;
		isRecurring?: boolean;
		notes?: string;
	};

	const txs: TxSeed[] = [];

	// Monthly salary (income) for each of the last 6 months
	for (let m = 5; m >= 0; m--) {
		txs.push({
			merchant: "Monthly Salary",
			amount: 3200,
			type: "Income",
			category: "salary",
			account: nbk.id,
			date: monthsAgo(m, 1),
			isRecurring: true,
		});
	}

	// Recurring subscriptions across months
	for (let m = 5; m >= 0; m--) {
		txs.push({
			merchant: "Netflix Kuwait",
			amount: 4.5,
			type: "Expense",
			category: "subscription",
			account: boubyan.id,
			date: monthsAgo(m, 23),
			isRecurring: true,
		});
		txs.push({
			merchant: "Apple One",
			amount: 5.9,
			type: "Expense",
			category: "subscription",
			account: boubyan.id,
			date: monthsAgo(m, 27),
			isRecurring: true,
		});
	}

	// Varied expenses across months (older months lighter, current month rich)
	const groceryMerchants = [
		"The Sultan Center",
		"Carrefour Market",
		"Lulu Hypermarket",
	];
	const diningMerchants = [
		"Salt Restaurant",
		"Shuaiba Refinery Cafe",
		"Pick Coffee",
	];
	const transportMerchants = [
		"Alpha Fuel Station",
		"Uber Delivery",
		"Q8 Petrol",
	];

	for (let m = 5; m >= 0; m--) {
		// groceries — a few per month
		txs.push({
			merchant: groceryMerchants[0]!,
			amount: 45.35,
			type: "Expense",
			category: "groceries",
			account: nbk.id,
			date: monthsAgo(m, 3),
		});
		txs.push({
			merchant: groceryMerchants[1]!,
			amount: 32.15,
			type: "Expense",
			category: "groceries",
			account: nbk.id,
			date: monthsAgo(m, 12),
		});
		txs.push({
			merchant: groceryMerchants[2]!,
			amount: 51.2,
			type: "Expense",
			category: "groceries",
			account: cash.id,
			date: monthsAgo(m, 20),
		});

		// dining
		txs.push({
			merchant: diningMerchants[0]!,
			amount: 8.75,
			type: "Expense",
			category: "dining",
			account: cash.id,
			date: monthsAgo(m, 8),
		});
		txs.push({
			merchant: diningMerchants[1]!,
			amount: 4.8,
			type: "Expense",
			category: "dining",
			account: nbk.id,
			date: monthsAgo(m, 18),
		});

		// transport
		txs.push({
			merchant: transportMerchants[0]!,
			amount: 12.5,
			type: "Expense",
			category: "transport",
			account: nbk.id,
			date: monthsAgo(m, 6),
		});
		txs.push({
			merchant: transportMerchants[1]!,
			amount: 3.25,
			type: "Expense",
			category: "transport",
			account: kfh.id,
			date: monthsAgo(m, 22),
		});

		// shopping / entertainment occasionally
		if (m % 2 === 0) {
			txs.push({
				merchant: "The Avenues Mall",
				amount: 89,
				type: "Expense",
				category: "shopping",
				account: boubyan.id,
				date: monthsAgo(m, 14),
			});
		}
		txs.push({
			merchant: "VOX Cinemas",
			amount: 12,
			type: "Expense",
			category: "entertainment",
			account: nbk.id,
			date: monthsAgo(m, 10),
		});

		// bills as transactions
		txs.push({
			merchant: "Electricity Ministry",
			amount: 28.4,
			type: "Expense",
			category: "bills",
			account: nbk.id,
			date: monthsAgo(m, 25),
		});
	}

	// CURRENT month: push dining OVER budget (limit 100) and groceries NEAR (limit 200)
	txs.push({
		merchant: "Salt Restaurant",
		amount: 42,
		type: "Expense",
		category: "dining",
		account: nbk.id,
		date: monthsAgo(0, 5),
	});
	txs.push({
		merchant: "Pick Coffee",
		amount: 38,
		type: "Expense",
		category: "dining",
		account: cash.id,
		date: monthsAgo(0, 9),
	});
	txs.push({
		merchant: "Machboos House",
		amount: 35,
		type: "Expense",
		category: "dining",
		account: nbk.id,
		date: monthsAgo(0, 11),
	}); // dining now ~157 > 100 (OVER)
	txs.push({
		merchant: "Carrefour Market",
		amount: 60,
		type: "Expense",
		category: "groceries",
		account: nbk.id,
		date: monthsAgo(0, 7),
	});
	txs.push({
		merchant: "The Sultan Center",
		amount: 55,
		type: "Expense",
		category: "groceries",
		account: nbk.id,
		date: monthsAgo(0, 13),
	}); // groceries now ~160 near/over 200

	// Transfers: account-to-account (two rows, shared group, signed)
	for (let m = 4; m >= 1; m -= 2) {
		const group = crypto.randomUUID();
		txs.push({
			merchant: "Transfer to Boubyan",
			amount: 500,
			type: "Transfer",
			account: nbk.id,
			date: monthsAgo(m, 26),
			transferGroupId: group,
		}); // out (negated below)
		txs.push({
			merchant: "Transfer from NBK",
			amount: 500,
			type: "Transfer",
			account: boubyan.id,
			date: monthsAgo(m, 26),
			transferGroupId: group,
			notes: "in",
		}); // in (kept positive below)
	}

	// Savings contributions (negative, tagged savingsId) across months
	function contribute(savingsId: string, amount: number, m: number) {
		txs.push({
			merchant: "Contribution",
			amount,
			type: "Transfer",
			account: nbk.id,
			date: monthsAgo(m, 2),
			savingsId,
		});
	}
	// Emergency: 6 months * ~650 => ~3900 saved (of 6000)
	for (let m = 5; m >= 0; m--) contribute(emergency.id, 650, m);
	// Vacation: 4 months * 200 => 800 (of 2000)
	for (let m = 3; m >= 0; m--) contribute(vacation.id, 200, m);
	// Car: 2 months * 600 => 1200 (of 8000, just started)
	for (let m = 1; m >= 0; m--) contribute(car.id, 600, m);

	// 8. Persist transactions with correct signing
	for (const t of txs) {
		let amount: number;
		if (t.type === "Income") {
			amount = t.amount; // positive
		} else if (t.type === "Expense") {
			amount = -t.amount; // negative
		} else {
			// Transfer: contributions & the "out" side are negative;
			// the "in" side (notes === "in") stays positive.
			amount = t.notes === "in" ? t.amount : -t.amount;
		}

		await prisma.transaction.create({
			data: {
				userId: USER_ID,
				merchant: t.merchant,
				amount: money(amount),
				type: t.type,
				date: t.date,
				isRecurring: t.isRecurring ?? false,
				accountId: t.account,
				categoryId: t.category ? need(t.category) : null,
				notes: t.notes ?? null,
				savingsId: t.savingsId ?? null,
				transferGroupId: t.transferGroupId ?? null,
			},
		});
	}

	// 9. Report
	const counts = {
		accounts: await prisma.account.count({ where: { userId: USER_ID } }),
		transactions: await prisma.transaction.count({
			where: { userId: USER_ID },
		}),
		budgets: await prisma.budget.count({ where: { userId: USER_ID } }),
		savings: await prisma.savings.count({ where: { userId: USER_ID } }),
		bills: await prisma.bill.count({ where: { userId: USER_ID } }),
	};
	console.log("Dev seed complete:", counts);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
