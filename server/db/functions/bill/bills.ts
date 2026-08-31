import { prisma } from "../../../lib/prisma.js";
import type {
	CreateBillData,
	EditBillData,
	MarkAsPaid,
} from "../../../schemas/bills/bills.js";
import { dbGetBillsStats } from "../stats/stats.js";

export const addBill = async (bill: CreateBillData, userId: string) => {
	return await prisma.bill.create({ data: { ...bill, userId } });
};
export const updateBill = async (bill: EditBillData, id: string) => {
	return await prisma.bill.update({ where: { id }, data: { ...bill } });
};
export const dbMarkAsPaid = async (id: string, userId: string) => {
	return prisma.bill.updateMany({
		where: { id, userId },
		data: { paidAt: new Date() },
	});
};
export const dbGetBills = async (userId: string) => {
	return await prisma.bill.findMany({
		where: { userId },
		include: { category: true, account: true },
	});
};
export const dbGetBill = async (userId: string, id: string) => {
	return await prisma.bill.findFirst({
		where: { userId, id },
		include: { category: true, account: true },
	});
};
export const dbDeleteBill = async (userId: string, id: string) => {
	return await prisma.bill.deleteMany({ where: { userId, id } });
};

export const dbGetBillsPageStats = async (userId: string) => {
	const [bills, summary] = await Promise.all([
		prisma.bill.findMany({ where: { userId }, orderBy: { dueDate: "asc" } }),
		dbGetBillsStats(userId),
	]);
	return { bills, summary };
};
