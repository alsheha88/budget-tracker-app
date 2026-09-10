import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createBill,
	deleteBill,
	editBill,
	getBillsStats,
	markAsPaid,
} from "../../api/bills/bills";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../lib/api";

export const useGetBillsStats = () => {
	return useQuery({
		queryKey: ["billsStats"],
		queryFn: getBillsStats,
	});
};
export const useCreateBill = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createBill,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["billsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Bill Created");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useEditBill = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: editBill,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["billsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Changes Saved");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useMarkAsPaid = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: markAsPaid,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["billsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Changes Saved");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useDeleteBill = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteBill,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["billsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Bill Deleted");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
