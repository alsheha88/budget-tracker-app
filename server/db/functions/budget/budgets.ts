import { prisma } from "../../../lib/prisma.js";
import type {
	CreateBudgetData,
	EditBudgetData,
} from "../../../schemas/budgets/budgets.js";

export const addBudget = async (budget: CreateBudgetData, userId: string) => {
	return await prisma.budget.create({ data: { ...budget, userId } });
};
export const updateBudget = async (budget: EditBudgetData, id: string) => {
	return await prisma.budget.update({ where: { id }, data: { ...budget } });
};

export const dbGetBudgets = async (userId: string) => {
	return await prisma.budget.findMany({ where: { userId } });
};
export const dbGetBudget = async (userId: string, id: string) => {
	return await prisma.budget.findFirst({ where: { userId, id } });
};
export const dbDeleteBudget = async (userId: string, id: string) => {
	return await prisma.budget.deleteMany({ where: { userId, id } });
};
