import type { TransactionsResponse } from "../../../../shared/types";
import { api } from "../../lib/api";
import type { IdParamsType } from "../../schemas/authSchema";
import type {
	CreateTransactionData,
	TransferTransactionData,
} from "../../schemas/transactionsSchema";

export type Response = TransactionsResponse & {
	page: number;
	limit: number;
	totalPages: number;
};

export const getTransactions = async (
	page: number,
	search?: string,
): Promise<Response> => {
	const res = await api.get(`/transactions`, { params: { page, search } });

	return res.data.data;
};
export const createTransaction = async (data: CreateTransactionData) => {
	const res = await api.post(`/transactions`, data);

	return res.data.data.transaction;
};
export const editTransaction = async ({
	data,
	id,
}: {
	data: CreateTransactionData;
	id: IdParamsType;
}) => {
	const res = await api.patch(`/transactions/${id}`, data);

	return res.data.data.transaction;
};
export const deleteTransaction = async (id: IdParamsType) => {
	const res = await api.delete(`/transactions/${id}`);

	return res.data.message;
};
export const createTransfer = async (data: TransferTransactionData) => {
	const res = await api.post(`/transactions/transfer`, data);

	return res.data.data.transaction;
};
