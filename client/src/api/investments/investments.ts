import type { InvestmentsData } from "../../../../shared/types";
import { api } from "../../lib/api";
import type { BuyInvestmentData } from "../../schemas/investmenstSchema";

export const getInvestmentsStats = async (): Promise<InvestmentsData> => {
	const res = await api.get("investments/stats");

	return res.data.data.investmentsStats;
};
export const buyInvestment = async (
	data: BuyInvestmentData,
) => {
	const res = await api.post("investments/buy", data);

	return res.data.data.message;
};
