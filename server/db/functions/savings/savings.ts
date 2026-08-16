import { prisma } from "../../../lib/prisma.js";
import type { CreateSavingsData, EditSavingsData } from "../../../schemas/savings/savings.js";


export const addSaving = async (savings: CreateSavingsData, userId: string) => {
	return await prisma.savings.create({ data: { ...savings, userId } });
};
export const updateSaving = async (savings: EditSavingsData, id: string) => {
	return await prisma.savings.update({ where: { id }, data: { ...savings } });
};

export const dbGetSavings = async (userId: string) => {
	return await prisma.savings.findMany({ where: { userId } });
};
export const dbGetSaving = async (userId: string, id: string) => {
	return await prisma.savings.findFirst({ where: { userId, id } });
};
export const dbDeleteSaving = async (userId: string, id: string) => {
	return await prisma.savings.deleteMany({ where: { userId, id } });
};