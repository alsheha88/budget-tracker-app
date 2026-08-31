import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactions/transactions";

export const useTransactions = (page: number, search?:string) => {
	return useQuery({
		queryFn: () => getTransactions(page, search),
		queryKey: ["transactions", page, search],
		placeholderData: keepPreviousData,
	});
};
