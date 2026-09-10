import type { AccountStatsResponse } from "../../../../shared/types";
import { api } from "../../lib/api";
import { type CreateAccountData } from "../../schemas/accountsSchema";
import { type IdParamsType } from "../../schemas/authSchema";

export const getAccountStats = async (): Promise<AccountStatsResponse> => {
	const res = await api.get("/accounts/stats");

	return res.data.data.accountStats;
};

export const createAccount = async (data: CreateAccountData) => {
	const res = await api.post("/accounts", data);

	return res.data.data.account;
};

export const editAccount = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: CreateAccountData;
}) => {
	const res = await api.patch(`/accounts/${id}`, data);
	return res.data.data.account;
};

