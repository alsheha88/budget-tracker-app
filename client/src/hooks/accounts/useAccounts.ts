import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createAccount,
	editAccount,
	getAccountStats,
} from "../../api/accounts/accounts";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../lib/api";

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
			toast.success("Account Created");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
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
			toast.success("Changes Saved");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
