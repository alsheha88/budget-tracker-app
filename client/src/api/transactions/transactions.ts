import type { TransactionsResponse } from "../../../../shared/types";
import { api } from "../../lib/api";

export type Response = TransactionsResponse & {
	page: number;
	limit: number;
	totalPages: number;
};

export const getTransactions = async (page:number, search?:string): Promise<Response> => {
	const res = await api.get(`/transactions`, {params: {page, search}});

	return res.data.data;
};
