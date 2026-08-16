import type { RequestHandler } from "express";
import {
	contributionSchema,
	createTransactionSchema,
	editTransactionSchema,
	transferTransactionSchema,
} from "../../schemas/transactions/transactions.js";
import { NotFoundError, ValidationError } from "../../errors/errors.js";
import {
	createTransaction,
	dbCreateContribution,
	dbCreateTransfer,
	dbDeleteTransaction,
	dbGetAllTransactions,
	dbGetTransaction,
	updateTransaction,
} from "../../db/functions/transaction/transactions.js";
import { idParamsSchema } from "../../schemas/user/user.js";
import { queryParams } from "../../schemas/query/queryParams.js";

export const getTransaction: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError("Invalid transaction id", parsedId.error.issues);
	const id = parsedId.data;

	const transaction = await dbGetTransaction(id, userId);
	if (!transaction) throw new NotFoundError("Transaction not found");

	res.status(200).json({ data: { transaction } });
};
export const getTransactions: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = queryParams.safeParse(req.query);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate query params",
			validateRequest.error.issues,
		);
	const {
		page,
		limit,
		maxAmount,
		minAmount,
		dateFrom,
		dateTo,
		categoryId,
		accountId,
		type,
		search,
		isRecurring,
	} = validateRequest.data;

	const skip = (page - 1) * limit;

	const { transactions, count } = await dbGetAllTransactions(userId, {
		limit,
		skip,
		maxAmount,
		minAmount,
		dateFrom,
		dateTo,
		accountId,
		categoryId,
		type,
		search,
		isRecurring,
	});

	res.status(200).json({
		data: {
			transactions,
			count,
			page,
			limit,
			totalPages: Math.ceil(count / limit),
		},
	});
};

export const deleteTransaction: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError("Invalid transaction id", parsedId.error.issues);
	const id = parsedId.data;

	const transaction = await dbDeleteTransaction(id, userId);
	if (!transaction.count)
		throw new NotFoundError("Couldn't delete transaction");

	res.status(200).json({ message: "Transaction deleted successfully" });
};

export const addTransaction: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = createTransactionSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate input data",
			validateRequest.error.issues,
		);
	const type = validateRequest.data.type;
	const amount =
		type === "Expense"
			? -validateRequest.data.amount
			: validateRequest.data.amount;
	const newTransaction = { ...validateRequest.data, amount };

	const transaction = await createTransaction(newTransaction, userId);

	res.status(201).json({ data: { transaction } });
};
export const addTransferTransaction: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = transferTransactionSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate input data",
			validateRequest.error.issues,
		);

	const transaction = await dbCreateTransfer(userId, validateRequest.data);
	if (transaction === null)
		throw new NotFoundError("One or both accounts not found");

	res.status(201).json({ data: { transaction } });
};
export const addContribution: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = contributionSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate input data",
			validateRequest.error.issues,
		);
	const contribution = await dbCreateContribution(userId, validateRequest.data);
	if (contribution === null)
		throw new NotFoundError("account or savings not found");

	res.status(201).json({ data: { contribution } });
};
export const editTransaction: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError("Invalid transaction id", parsedId.error.issues);
	const id = parsedId.data;
	const validateRequest = editTransactionSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate input data",
			validateRequest.error.issues,
		);

	const existingTransaction = await dbGetTransaction(id, userId);
	if (!existingTransaction) throw new NotFoundError("Transaction not found");

	const transaction = await updateTransaction(validateRequest.data, userId, id);

	res.status(200).json({ data: { transaction } });
};
