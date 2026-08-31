import {
	dbGetAccountStats,
	dbGetBudgetStats,
	dbGetDashboardStats,
	dbGetSavingsPageStats,
} from "../server/db/functions/stats/stats";
import {dbGetBillsPageStats} from '../server/db/functions/bill/bills'
import type { dbGetAllTransactions } from "../server/db/functions/transaction/transactions";


export type DashboardStats = Awaited<ReturnType<typeof dbGetDashboardStats>>;
export type TransactionsResponse = Awaited<
	ReturnType<typeof dbGetAllTransactions>
>;
export type AccountStatsResponse = Awaited<
	ReturnType<typeof dbGetAccountStats>
>;
export type SavingsResponse = Awaited<ReturnType<typeof dbGetSavingsPageStats>>;

export type BudgetsStatsResponse = Awaited<ReturnType<typeof dbGetBudgetStats>>;

export type BillsStatsRespoonse = Awaited<ReturnType<typeof dbGetBillsPageStats>>;







