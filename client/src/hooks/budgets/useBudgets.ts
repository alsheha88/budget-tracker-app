import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createBudget,
	deleteBudget,
	editBudget,
	getBudgetsStats,
} from "../../api/budgets/budgets";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../lib/api";

export const useGetBudgetsStats = () => {
	return useQuery({
		queryKey: ["budgetsStats"],
		queryFn: getBudgetsStats,
	});
};

export const useCreateBudget = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createBudget,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["budgetsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Budget Created");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useEditBudget = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editBudget,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["budgetsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Schnages Saved");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useDeleteBudget = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteBudget,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["budgetsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Budget Deleted");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
