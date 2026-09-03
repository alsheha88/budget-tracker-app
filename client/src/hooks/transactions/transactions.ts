import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	createTransaction,
	createTransfer,
	deleteTransaction,
	editTransaction,
	getTransactions,
} from "../../api/transactions/transactions";

export const useTransactions = (page: number, search?: string) => {
	return useQuery({
		queryFn: () => getTransactions(page, search),
		queryKey: ["transactions", page, search],
		placeholderData: keepPreviousData,
	});
};

export const useCreateTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["budgetsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["billsStats"] });
			queryClient.invalidateQueries({ queryKey: ["savingsStats"] });
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
		},
	});
};
export const useEditTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["budgetsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["billsStats"] });
			queryClient.invalidateQueries({ queryKey: ["savingsStats"] });
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
		},
	});
};
export const useDeleteTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["budgetsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["billsStats"] });
			queryClient.invalidateQueries({ queryKey: ["savingsStats"] });
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
		},
	});
};
export const useCreateTransfer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTransfer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["budgetsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["billsStats"] });
			queryClient.invalidateQueries({ queryKey: ["savingsStats"] });
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
		},
	});
};
