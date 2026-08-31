import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createBudget,
	deleteBudget,
	editBudget,
	getBudgetsStats,
} from "../../api/budgets/budgets";

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
		},
	});
};
