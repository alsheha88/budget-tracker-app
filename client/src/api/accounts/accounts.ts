import { api } from "../../lib/api";

type AccountsListResponse = {
	id: string;
	name: string;
	accountType:
		| "cash"
		| "checking"
		| "savings"
		| "credit"
		| "investment"
		| "loan";
	startingBalance: string;
	createdAt: string;
	updatedAt: string;
	userId: string;
}[];

export const getAccounts = async (): Promise<AccountsListResponse> => {
	const res = await api.get("/accounts");

	return res.data.data.accounts;
};
