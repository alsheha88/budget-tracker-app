import { prisma } from "../../../lib/prisma.js";
import type { CreateAccountData, EditAccountData } from "../../../schemas/accounts/accounts.js";

export const findAccounts = async (userId: string) => {
	return await prisma.account.findMany({ where: { userId } });
};

export const findAccount = async (name: string, userId: string) => {
	return await prisma.account.findUnique({ where: { userId_name: { userId, name } } })
};
export const findAccountById = async (id: string, userId: string) => {
	return await prisma.account.findFirst({ where: { userId, id } })
};
export const addAccount = async (account: CreateAccountData, userId: string) => {
	return await prisma.account.create({data: {name: account.name, startingBalance: account.startingBalance, accountType: account.accountType, userId} })
};
export const updateAccount = async (account: EditAccountData, id:string) => {
	return await prisma.account.update({where: {id}, data: {name: account.name, accountType: account.accountType} })
};


export const dbDeleteAccount = async (id: string, userId: string) => {
	return await prisma.account.deleteMany({where: {id, userId}})
}