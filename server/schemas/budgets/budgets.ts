import z from "zod";

export const createBudgetSchema = z.object({
	name: z.string().min(1, "This field is required"),
	limit: z.number().positive().multipleOf(0.001).max(1_000_000),
	period: z.enum(["weekly", "monthly", "quarterly", "yearly"]),
	startDate: z.coerce.date(),
	categoryId: z.uuid(),
	rollover: z.boolean(),
	notes: z.string().nullable(),
	alertThreshold: z.int().min(1).max(100)
});

export const editBudgetSchema = createBudgetSchema.omit({
	period: true,
	categoryId: true,
});

export type CreateBudgetData = z.infer<typeof createBudgetSchema>;
export type EditBudgetData = z.infer<typeof editBudgetSchema>;
