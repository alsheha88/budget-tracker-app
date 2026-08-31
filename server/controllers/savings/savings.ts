import type { RequestHandler } from "express";
import { NotFoundError, ValidationError } from "../../errors/errors.js";
import { idParamsSchema } from "../../schemas/user/user.js";
import {
	createSavingsSchema,
	editSavingsSchema,
} from "../../schemas/savings/savings.js";
import {
	addSaving,
	dbDeleteSaving,
	dbGetSaving,
	dbGetSavings,
	updateSaving,
} from "../../db/functions/savings/savings.js";
import { dbGetSavingsPageStats, dbGetSavingsStats } from "../../db/functions/stats/stats.js";

export const createSavings: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = createSavingsSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate input data",
			validateRequest.error.issues,
		);
	const savings = await addSaving(validateRequest.data, userId);

	res.status(201).json({ data: { savings } });
};
export const editSavings: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = editSavingsSchema.safeParse(req.body);
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
	const exisitingSavings = await dbGetSaving(userId, id);
	if (!exisitingSavings) throw new NotFoundError("Savings not found");
	const savings = await updateSaving(validateRequest.data, id);

	res.status(200).json({ data: { savings } });
};

export const deleteSavings: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate input data",
			parsedId.error.issues,
		);
	const id = parsedId.data;

	const savings = await dbDeleteSaving(userId, id);
	if (!savings.count) throw new NotFoundError("Couldn't delete savings");

	res.status(200).json({ message: "savings deleted successfully" });
};
export const getSavings: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate input data",
			parsedId.error.issues,
		);
	const id = parsedId.data;
	const savings = await dbGetSaving(userId, id);
	if (!savings) throw new NotFoundError("Savings not found");

	res.status(200).json({ data: { savings } });
};
export const getAllSavings: RequestHandler = async (req, res) => {
	const userId = req.user.id;

	const savings = await dbGetSavings(userId);

	res.status(200).json({ data: { savings } });
};

export const getSavingsStats: RequestHandler = async (req, res) => {
	const userId = req.user.id;

	const savingsStats = await dbGetSavingsPageStats(userId);

	res.status(200).json({ data: { savingsStats } });
};
