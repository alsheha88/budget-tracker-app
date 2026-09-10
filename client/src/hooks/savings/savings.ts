import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createContribution,
	createSavings,
	deleteSavings,
	editSavings,
	getSavings,
	getSavingsStats,
} from "../../api/savings/savings";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../lib/api";

export const useGetSavings = () => {
	return useQuery({
		queryFn: getSavings,
		queryKey: ["savings"],
	});
};
export const useGetSavingsStats = () => {
	return useQuery({
		queryFn: getSavingsStats,
		queryKey: ["savingsStats"],
	});
};

export const useCreateSavings = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createSavings,
		onSuccess: () => {
			(queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
				queryClient.invalidateQueries({ queryKey: ["savingsStats"] }));
			toast.success("Savings Goal Created");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useEditSavings = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: editSavings,
		onSuccess: () => {
			(queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
				queryClient.invalidateQueries({ queryKey: ["savingsStats"] }));
			toast.success("Changes Saved");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useDeleteSavings = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteSavings,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["savingsStats"] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			toast.success("Savings Deleted");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useCreateContribution = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createContribution,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["savingsStats"] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			toast.success("Contribution added");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
