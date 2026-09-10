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
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../lib/api";

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
			toast.success("Transaction Created");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
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
			toast.success("Changes Saved");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
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
			toast.success("Transaction Deleted");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
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
			toast.success("Transfer Completed");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
