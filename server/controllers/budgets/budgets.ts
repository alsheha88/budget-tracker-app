import type { RequestHandler } from "express";
import {
	createBudgetSchema,
	editBudgetSchema,
} from "../../schemas/budgets/budgets.js";
import {
	ConflictError,
	NotFoundError,
	ValidationError,
} from "../../errors/errors.js";
import {
	addBudget,
	dbDeleteBudget,
	dbGetBudget,
	dbGetBudgets,
	updateBudget,
} from "../../db/functions/budget/budgets.js";
import { Prisma } from "../../db/generated/prisma/client.js";
import { idParamsSchema } from "../../schemas/user/user.js";
import { dbGetBudgetStats } from "../../db/functions/stats/stats.js";

export const createBudget: RequestHandler = async (req, res) => {
	const validateRequest = createBudgetSchema.safeParse(req.body);
	const userId = req.user.id;
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate input data",
			validateRequest.error.issues,
		);

	try {
		const budget = await addBudget(validateRequest.data, userId);
		res.status(201).json({ data: { budget } });
	} catch (err) {
		if (
			err instanceof Prisma.PrismaClientKnownRequestError &&
			err.code === "P2002"
		) {
			throw new ConflictError(
				"You already have a budget for this category and period",
			);
		}
		throw err;
	}
};

export const editBudget: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = editBudgetSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate input data",
			validateRequest.error.issues,
		);
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate input data",
			parsedId.error.issues,
		);
	const id = parsedId.data;

	const exisitingBudget = await dbGetBudget(userId, id);
	if (!exisitingBudget) throw new NotFoundError("budget not found");

	const budget = await updateBudget(validateRequest.data, id);

	res.status(200).json({ data: { budget } });
};

export const getBudgets: RequestHandler = async (req, res) => {
	const userId = req.user.id;

	const budgets = await dbGetBudgets(userId);

	res.status(200).json({ data: { budgets } });
};
export const getBudget: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate input data",
			parsedId.error.issues,
		);
	const id = parsedId.data;

	const budget = await dbGetBudget(userId, id);

	if (!budget) throw new NotFoundError("Budget not found");

	res.status(200).json({ data: { budget } });
};
export const deleteBudget: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate input data",
			parsedId.error.issues,
		);
	const id = parsedId.data;

	const budget = await dbDeleteBudget(userId, id);

	if (!budget.count) throw new NotFoundError("Couldn't delete budget");

	res.status(200).json({ data: { message: "Budget deleted succesfully" } });
};

export const getBudgetsStats: RequestHandler = async (req, res) => {
	const userId = req.user.id;

	const budgets = await dbGetBudgetStats(userId);

	res.status(200).json({ data: { budgets } });
};
