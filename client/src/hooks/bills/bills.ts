import { useQuery } from "@tanstack/react-query";
import { getBillsStats } from "../../api/bills/bills";

export const useGetBillsStats = () => {
	return useQuery({
		queryKey: ["billsStats"],
		queryFn: getBillsStats,
	});
};
