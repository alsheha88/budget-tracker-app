import type { RequestHandler } from "express";
import { createBillSchema, editBillSchema } from "../../schemas/bills/bills.js";
import { NotFoundError, ValidationError } from "../../errors/errors.js";
import {
	addBill,
	dbDeleteBill,
	dbGetBill,
	dbGetBills,
	dbGetBillsPageStats,
	dbMarkAsPaid,
	updateBill,
} from "../../db/functions/bill/bills.js";
import { idParamsSchema } from "../../schemas/user/user.js";

export const createBill: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = createBillSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate input data",
			validateRequest.error.issues,
		);
	const bill = await addBill(validateRequest.data, userId);

	res.status(201).json({ data: { bill } });
};
export const editBill: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const validateRequest = editBillSchema.safeParse(req.body);
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
	const exisitingBill = await dbGetBill(userId, id);
	if (!exisitingBill) throw new NotFoundError("Bill not found");
	const bill = await updateBill(validateRequest.data, id);

	res.status(200).json({ data: { bill } });
};

export const markAsPaid: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate input data",
			parsedId.error.issues,
		);
	const id = parsedId.data;

	const paidBill = await dbMarkAsPaid(id, userId);
	if (!paidBill.count) throw new NotFoundError("Couldn't update bill");

	res.status(200).json({ message: "Bill updated successfully" });
};

export const deleteBill: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate input data",
			parsedId.error.issues,
		);
	const id = parsedId.data;

	const bill = await dbDeleteBill(userId, id);
	if (!bill.count) throw new NotFoundError("Couldn't delete bill");

	res.status(200).json({ message: "Bill deleted successfully" });
};
export const getBill: RequestHandler = async (req, res) => {
	const userId = req.user.id;
	const parsedId = idParamsSchema.safeParse(req.params.id);
	if (!parsedId.success)
		throw new ValidationError(
			"Failed to validate input data",
			parsedId.error.issues,
		);
	const id = parsedId.data;
	const bill = await dbGetBill(userId, id);
	if (!bill) throw new NotFoundError("Bill not found");

	res.status(200).json({ data: { bill } });
};
export const getBills: RequestHandler = async (req, res) => {
	const userId = req.user.id;

	const bills = await dbGetBills(userId);
	if (!bills) throw new NotFoundError("Bill not found");

	res.status(200).json({ data: { bills } });
};


export const getBillsStats: RequestHandler = async (req, res) => {
	const userId = req.user.id;

	const billsStats = await dbGetBillsPageStats(userId);

	res.status(200).json({ data: { billsStats } });
};