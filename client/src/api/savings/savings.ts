import type { SavingsResponse } from "../../../../shared/types";
import { api } from "../../lib/api";
import type { IdParamsType } from "../../schemas/authSchema";
import type { CreateSavingsData } from "../../schemas/savingsSchema";
import type { ContributionData } from "../../schemas/transactionsSchema";

export const getSavings = async (): Promise<SavingsResponse> => {
	const res = await api.get("/savings");

	return res.data.data.savings;
};
export const getSavingsStats = async (): Promise<SavingsResponse> => {
	const res = await api.get("/savings/stats");

	return res.data.data.savingsStats;
};

export const createSavings = async (data: CreateSavingsData) => {
	const res = await api.post("/savings", data);

	return res.data.data.savings;
};
export const editSavings = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: CreateSavingsData;
}) => {
	const res = await api.patch(`/savings/${id}`, data);

	return res.data.data.savings;
};
export const createContribution = async (data: ContributionData) => {
  const res = await api.post("/savings/contribute", data);
  return res.data.data.contribution;
};
export const deleteSavings = async (id:IdParamsType) => {
  const res = await api.delete(`/savings/${id}`);
  return res.data.data.message;
};
