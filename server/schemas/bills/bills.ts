import { prisma } from "../../lib/prisma.js";
import { Prisma, type Bill } from "../../db/generated/prisma/client.js";
import z from "zod";

export const createBillSchema = z.object({
	amount: z.number().positive().multipleOf(0.001).max(1_000_000),
	name: z.string().min(1, "This field is required"),
	provider: z.string().min(1, "This field is required"),
	dueDate: z.coerce.date(),
	frequency: z.enum(["weekly", "monthly", "yearly"]),
	notes: z.string().nullable(),
	accountId: z.uuid().nullable(),
	categoryId: z.uuid().nullable(),
});

export const markAspPaidSchema = z.object({
	paidAt: z.coerce.date(),
});

export const editBillSchema = createBillSchema;

export type CreateBillData = z.infer<typeof createBillSchema>;
export type EditBillData = z.infer<typeof editBillSchema>;
export type MarkAsPaid = z.infer<typeof markAspPaidSchema>