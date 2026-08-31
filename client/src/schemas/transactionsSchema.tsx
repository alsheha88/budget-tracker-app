import z from "zod";

export const createTransactionSchema = z.object({
	merchant: z.string().min(1, "This field is required"),
	description: z.string().optional(),
	amount: z.number().positive().multipleOf(0.001).max(1_000_000),
	type: z.enum(["Income", "Expense"]),
	isRecurring: z.boolean(),
	date: z.coerce.date(),
	notes: z.string().optional(),
	categoryId: z.uuid(),
	accountId: z.uuid(),
	billId: z.uuid().optional(),
});

const transferAccounts = z.object({
	fromAccount: z.uuid(),
	toAccount: z.uuid(),
});

export const transferTransactionSchema = z.object({
	accounts: transferAccounts.refine((d) => d.fromAccount !== d.toAccount, {
		message: "Cannot transfer to the same account",
	}),
	amount: z.number().positive().multipleOf(0.001).max(1_000_000),
	date: z.coerce.date(),
	notes: z.string().nullable(),
});

export const formContributionSchema = z.object({
	accountId: z.string().uuid(),
	amount: z.number().positive().multipleOf(0.001).max(1_000_000),
});

export const contributionSchema = z.object({
	accountId: z.uuid(),
	savingsId: z.uuid(),
	amount: z.number().positive().multipleOf(0.001).max(1_000_000),
	date: z.coerce.date(),
	notes: z.string().nullable(),
});

export type CreateTransactionData = z.infer<typeof createTransactionSchema>;
export const editTransactionSchema = createTransactionSchema.omit({
	isRecurring: true,
});
export type EditTransactionData = z.infer<typeof editTransactionSchema>;

export type TransferTransactionData = z.infer<typeof transferTransactionSchema>;

export type ContributionData = z.infer<typeof contributionSchema>;
export type FormContributionData = z.infer<typeof formContributionSchema>;
