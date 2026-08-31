import type { BudgetsStatsResponse } from "../../../../shared/types";
import { api } from "../../lib/api";
import type { IdParamsType } from "../../schemas/authSchema";
import type {
	CreateBudgetData,
	EditBudgetData,
} from "../../schemas/BudgetsSchema";

export const getBudgetsStats = async (): Promise<BudgetsStatsResponse> => {
	const res = await api.get("/budgets/stats");

	return res.data.data.budgets;
};
export const createBudget = async (data: CreateBudgetData) => {
	const res = await api.post("/budgets", data);

	return res.data.data.budget;
};
export const editBudget = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: EditBudgetData;
}) => {
	const res = await api.patch(`/budgets/${id}`, data);

	return res.data.data.budget;
};
export const deleteBudget = async (id: IdParamsType) => {
	const res = await api.delete(`/budgets/${id}`);

	return res.data.data.message;
};
