import z from "zod";

export const categoriesSchema = z.object({
	categories: z.array(z.object({ name: z.string(), color: z.string() })),
});
export const categorySchema = z.object({
	categories: z.object({ name: z.string(), color: z.string() }),
});


export type CategoryData = z.infer<typeof categorySchema>
export type CategoriesData = z.infer<typeof categoriesSchema>
