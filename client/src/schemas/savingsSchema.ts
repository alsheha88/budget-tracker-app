import z from "zod";



export const createSavingsSchema = z.object({
    name: z.string().min(1, "This field is required"),
    description: z.string().nullable(),
    target: z.number().positive().multipleOf(0.001).max(1_000_000),
    monthlyContribution: z.number().positive().multipleOf(0.001).max(1_000_000).nullable(),
    priority: z.enum(["high", "medium", "low"]),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color").optional(),
    targetDate: z.date().nullable(),
});

export const editSavingsSchema = createSavingsSchema

export type CreateSavingsData = z.infer<typeof createSavingsSchema>;
export type EditSavingsData = z.infer<typeof editSavingsSchema>;