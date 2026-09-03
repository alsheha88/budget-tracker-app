import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createBill,
	deleteBill,
	editBill,
	getBillsStats,
	markAsPaid,
} from "../../api/bills/bills";

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
		},
	});
};
export const useMarkAsPaid = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: markAsPaid,
		onSuccess: () => {
			console.log("HOOK onSuccess RUNNING");
			queryClient.invalidateQueries({ queryKey: ["billsStats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
		onError: (e) => {
			console.log("MUTATION ERROR:", e);
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
		},
	});
};
