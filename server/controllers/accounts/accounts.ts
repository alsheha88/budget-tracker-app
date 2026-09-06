import type { RequestHandler } from "express";
import {
	addAccount,
	dbDeleteAccount,
	findAccountById,
	findAccounts,
	updateAccount,
} from "../../db/functions/account/accounts.js";
import {
	createAccountSchema,
	editAccountSchema,
} from "../../schemas/accounts/accounts.js";
import {
	ConflictError,
	NotFoundError,
	ValidationError,
} from "../../errors/errors.js";
import { Prisma } from "../../db/generated/prisma/client.js";
import { idParamsSchema } from "../../schemas/user/user.js";
import { dbGetAccountStats } from "../../db/functions/stats/stats.js";

export const getAccounts: RequestHandler = async (req, res) => {
	const userId = req.user.id;

	const accounts = await findAccounts(userId);

	res.status(200).json({ data: { accounts } });
};
export const getAccount: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate account id",
			parsedId.error.issues,
		);
	const id = parsedId.data;

	const account = await findAccountById(id, userId);
	if (!account) throw new NotFoundError("Account not found");

	res.status(200).json({ data: { account } });
};
export const createAccount: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = createAccountSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate input data",
			validateRequest.error.issues,
		);

	try {
		const account = await addAccount(validateRequest.data, userId);
		res.status(201).json({ data: { account } });
	} catch (err) {
		if (
			err instanceof Prisma.PrismaClientKnownRequestError &&
			err.code === "P2002"
		) {
			throw new ConflictError("You already have an account with this name");
		}
		throw err;
	}
};
export const editAccount: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate account id",
			parsedId.error.issues,
		);
	const id = parsedId.data;
	const validateRequest = editAccountSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate input data",
			validateRequest.error.issues,
		);

	try {
		const existingAccount = await findAccountById(id, userId);
		if (!existingAccount) throw new NotFoundError("Account not found");
		const account = await updateAccount(validateRequest.data, id);
		res.status(200).json({ data: { account } });
	} catch (err) {
		if (
			err instanceof Prisma.PrismaClientKnownRequestError &&
			err.code === "P2002"
		) {
			throw new ConflictError("You already have an account with this name");
		}
		throw err;
	}
};

export const deleteAccount: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate account id",
			parsedId.error.issues,
		);
	const id = parsedId.data;
	const existingAccount = await findAccountById(id, userId);
	if (!existingAccount) throw new NotFoundError("Account not found");

	try {
		const deletedAccount = await dbDeleteAccount(id, userId);
		res
			.status(200)
			.json({ data: { message: `${deletedAccount.count} account deleted` } });
	} catch (err) {
		if (
			err instanceof Prisma.PrismaClientKnownRequestError &&
			err.code === "P2003"
		) {
			throw new ConflictError(
				"Can't delete an account that still has transactions",
			);
		}
		throw err;
	}
};

export const getAccountStats: RequestHandler = async (req, res) => {
	const userId = req.user.id;

	const accountStats = await dbGetAccountStats(userId);

	res.status(200).json({ data: { accountStats } });
};
