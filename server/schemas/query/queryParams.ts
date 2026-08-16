import z from "zod";

export const queryParams = z.object({
	page: z.coerce.number().int().min(1).max(100).default(1),
	limit: z.coerce.number().int().min(1).max(50).default(10),
	categoryId: z.uuid().optional(),
	accountId: z.uuid().optional(),
	minAmount: z.coerce.number().optional(),
	maxAmount: z.coerce.number().optional(),
	dateFrom: z.coerce.date().optional(),
	dateTo: z.coerce.date().optional(),
	type: z.enum(["Income", "Expense", "Transfer"]).optional(),
	search: z.string().optional(),
	isRecurring: z.boolean().optional(),
});
