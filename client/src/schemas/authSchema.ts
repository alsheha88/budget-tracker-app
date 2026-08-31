import z from "zod";

const passwordField = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.max(64, "Password must be at most 64 characters");

const emailField = z.email().min(1, "Email is required");
export const createUserSchema = z.object({
	fullName: z.string().min(1, "This field is required"),
	passwordHash: passwordField,
	email: emailField,
	phoneNumber: z.string(),
	confirmPassword: z.string().min(1, "Please confirm your password"),

}).refine((data) => data.passwordHash === data.confirmPassword, {
	message: "Passwords doesnt match",
	path: ["confirmPassword"]
});
export const loginSchema = z.object({
	passwordHash: passwordField,
	email: emailField,
});

export type LoginData = z.infer<typeof loginSchema>;
export type SignUpData = z.infer<typeof createUserSchema>;
export type SignUpPayload = Omit<SignUpData, "confirmPassword">;

export const idParamsSchema = z.string().uuid();
export type IdParamsType = z.infer<typeof idParamsSchema>;


