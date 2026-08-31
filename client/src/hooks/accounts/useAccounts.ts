import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createAccount,
	deleteAccount,
	editAccount,
	getAccountStats,
} from "../../api/accounts/accounts";

export const useGetAccountStats = () => {
	return useQuery({
		queryFn: getAccountStats,
		queryKey: ["accounts"],
	});
};

export const useCreateAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createAccount,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
	});
};
export const useEditAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editAccount,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
	});
};

export const useDeleteAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteAccount,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
	});
};
