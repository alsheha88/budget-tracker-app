import z from "zod";

export const createAccountSchema = z.object({
	name: z.string().min(1, "This field is required"),
	accountType: z.enum([
		"cash",
		"checking",
		"savings",
		"credit",
		"investment",
		"loan",
	]),
	startingBalance: z.number().positive().multipleOf(0.001).max(1_000_000),
});

export const editAccountSchema = createAccountSchema.omit({startingBalance: true});

export type CreateAccountData = z.infer<typeof createAccountSchema>;
export type EditAccountData = z.infer<typeof editAccountSchema>;
