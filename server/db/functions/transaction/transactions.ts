import { prisma } from "../../../lib/prisma.js";
import type {
	ContributionData,
	CreateTransactionData,
	EditTransactionData,
	TransferTransactionData,
} from "../../../schemas/transactions/transactions.js";
import type { Prisma } from "../../generated/prisma/client.js";
import { v4 as uuidv4 } from "uuid";

type TransactionQueryOptions = {
	limit?: number;
	skip?: number;
	categoryId?: string | undefined;
	accountId?: string | undefined;
	dateFrom?: Date | undefined;
	dateTo?: Date | undefined;
	minAmount?: number | undefined;
	maxAmount?: number | undefined;
	type?: "Income" | "Expense" | "Transfer" | undefined;
	search?: string | undefined;
	isRecurring?: boolean | undefined;
};

export const dbGetAllTransactions = async (
	userId: string,
	{
		limit = 10,
		skip = 0,
		categoryId,
		accountId,
		dateFrom,
		dateTo,
		minAmount,
		maxAmount,
		type,
		search,
		isRecurring,
	}: TransactionQueryOptions,
) => {
	const where: Prisma.TransactionWhereInput = { userId };

	if (categoryId) where.categoryId = categoryId;
	if (accountId) where.accountId = accountId;

	if (dateFrom || dateTo) {
		where.date = {};
		if (dateFrom) where.date.gte = dateFrom;
		if (dateTo) where.date.lte = dateTo;
	}

	if (minAmount !== undefined || maxAmount !== undefined) {
		where.amount = {};
		if (minAmount !== undefined) where.amount.gte = minAmount;
		if (maxAmount !== undefined) where.amount.lte = maxAmount;
	}

	if (type !== undefined) where.type = type;
	if (isRecurring !== undefined) where.isRecurring = isRecurring;
	if (search !== undefined)
		where.merchant = { contains: search, mode: "insensitive" };

	const [transactions, count] = await Promise.all([
		prisma.transaction.findMany({
			where,
			include: { category: true, account: true },
			take: limit,
			skip,
			orderBy: { date: "desc" },
		}),
		prisma.transaction.count({ where }),
	]);
	return { transactions, count };
};

export const dbGetTransaction = async (id: string, userId: string) => {
	return await prisma.transaction.findFirst({
		where: { id, userId },
		include: { category: true, account: true },
	});
};

export const dbGetRecentTransactions = async (userId: string) => {
	return prisma.transaction.findMany({
		where: { userId },
		take: 5,
		orderBy: { date: "desc" },
		include: { category: true, account: true },
	});
};

export const dbDeleteTransaction = async (id: string, userId: string) => {
	return await prisma.transaction.deleteMany({ where: { id, userId } });
};

export const createTransaction = async (
	transaction: CreateTransactionData,
	userId: string,
) => {
	return prisma.transaction.create({
		data: {
			merchant: transaction.merchant,
			description: transaction.description ?? null,
			amount: transaction.amount,
			type: transaction.type,
			date: transaction.date,
			isRecurring: transaction.isRecurring,
			categoryId: transaction.categoryId,
			accountId: transaction.accountId,
			billId: transaction.billId ?? null,
			userId,
		},
	});
};
export const updateTransaction = async (
	transaction: EditTransactionData,
	userId: string,
	id: string,
) => {
	return prisma.transaction.update({
		where: { id },
		data: {
			merchant: transaction.merchant,
			description: transaction.description ?? null,
			amount: transaction.amount,
			type: transaction.type,
			date: transaction.date,
			categoryId: transaction.categoryId,
			accountId: transaction.accountId,
			billId: transaction.billId ?? null,
			userId,
		},
	});
};

export const dbCreateTransfer = async (
	userId: string,
	transferTransaction: TransferTransactionData,
) => {
	const transferGroupId = uuidv4();
	const getFromAccount = await prisma.account.findFirst({
		where: { id: transferTransaction.accounts.fromAccount, userId },
	});
	const getToAccount = await prisma.account.findFirst({
		where: { id: transferTransaction.accounts.toAccount, userId },
	});
	if (!getFromAccount || !getToAccount) return null;
	const accountFromName = getFromAccount.name;
	const accountToName = getToAccount.name;

	const [sendingAccount, receivingAccount] = await prisma.$transaction([
		prisma.transaction.create({
			data: {
				merchant: accountFromName,
				accountId: transferTransaction.accounts.fromAccount,
				amount: -transferTransaction.amount,
				date: transferTransaction.date,
				notes: transferTransaction.notes,
				type: "Transfer",
				transferGroupId: transferGroupId,
				userId,
			},
		}),

		prisma.transaction.create({
			data: {
				merchant: accountToName,
				accountId: transferTransaction.accounts.toAccount,
				amount: transferTransaction.amount,
				date: transferTransaction.date,
				notes: transferTransaction.notes,
				type: "Transfer",
				transferGroupId: transferGroupId,
				userId,
			},
		}),
	]);
	return { sendingAccount, receivingAccount };
};

export const dbCreateContribution = async (
	userId: string,
	contribution: ContributionData,
) => {
	const savings = await prisma.savings.findFirst({
		where: { userId, id: contribution.savingsId },
	});
	if (savings === null) return null;
	const account = await prisma.account.findFirst({
		where: { id: contribution.accountId, userId },
	});
	if (!account) return null;
	const goal = savings.name;

	return prisma.transaction.create({
		data: {
			merchant: goal,
			savingsId: contribution.savingsId,
			accountId: contribution.accountId,
			amount: -contribution.amount,
			notes: contribution.notes,
			date: contribution.date,
			userId,
			type: "Transfer",
		},
	});
};


