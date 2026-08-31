import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createContribution,
	createSavings,
	deleteSavings,
	editSavings,
	getSavings,
	getSavingsStats,
} from "../../api/savings/savings";

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
		},
		onError: (error) => {
			console.error("Create savings failed:", error);
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
		},
		onError: (error) => {
			console.error("Create savings failed:", error);
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
		},
		onError: (error) => {
			console.error("Create savings failed:", error);
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
		},
		onError: (error) => {
			console.error("Create savings failed:", error);
		},
	});
};
