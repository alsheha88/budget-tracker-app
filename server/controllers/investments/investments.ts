import type { RequestHandler } from "express";
import {
	dbBuyInvestment,
	dbGetInvestmentStats,
} from "../../db/functions/investment/investment.js";
import { buyInvestmentSchema } from "../../schemas/investment/investment.js";
import { ValidationError } from "../../errors/errors.js";

export const getInvestmentsStats: RequestHandler = async (req, res) => {
	const userId = req.user.id;

	const investmentsStats = await dbGetInvestmentStats(userId);

	res.status(200).json({ data: { investmentsStats } });
};
export const buyInvestment: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = buyInvestmentSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Couldn't validate investments data",
			validateRequest.error.issues,
		);

	await dbBuyInvestment(userId, validateRequest.data);

	res.status(201).json({ data: { message: "Investment purchased successfully" } });
};
