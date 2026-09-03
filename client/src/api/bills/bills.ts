import type { BillsStatsRespoonse } from "../../../../shared/types";
import { api } from "../../lib/api";
import type { IdParamsType } from "../../schemas/authSchema";
import type {
	CreateBillData,
	EditBillData,
	MarkAsPaid,
} from "../../schemas/billsSchema";

export const getBillsStats = async (): Promise<BillsStatsRespoonse> => {
	const res = await api.get("/bills/stats");
	return res.data.data.billsStats; // { bills, summary }
};
export const createBill = async (data: CreateBillData) => {
	const res = await api.post("/bills", data);
	return res.data.data.bill;
};
export const editBill = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: EditBillData;
}) => {
	const res = await api.patch(`/bills/${id}`, data);
	return res.data.data.bill;
};
export const markAsPaid = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: MarkAsPaid;
}) => {
	const res = await api.patch(`/bills/${id}/pay`, data);
	return res.data.message;
};
export const deleteBill = async (id: IdParamsType) => {
	const res = await api.delete(`/bills/${id}`);
	return res.data.data.message;
};
