import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	buyInvestment,
	getInvestmentsStats,
} from "../../api/investments/investments";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../lib/api";

export const useGetInvestmentsStats = () => {
	return useQuery({
		queryKey: ["investmentsStats"],
		queryFn: getInvestmentsStats,
	});
};
export const useBuyInvestment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: buyInvestment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["investmentsStats"] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Investment created");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
