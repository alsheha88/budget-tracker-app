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
    phoneNumber: z.string()
})
export const loginSchema = z.object({
    passwordHash: passwordField,
    email: emailField,
})


export const editUserSchema = z.object({
    fullName: z.string(),
    avatar: z.string(),
    phoneNumber: z.string(),
    timeZone: z.string(),
}).partial()


export const verifyEmailSchema = z.object({
	token: z.string().min(1),
});


export const idParamsSchema = z.uuid();


export type UpdateUser = z.infer<typeof editUserSchema>
export type CreateUser = z.infer<typeof createUserSchema>
export type LoginUser = z.infer<typeof loginSchema>