import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../api/dashboard/dashboard";

export const useDashboard = () => {
	return useQuery({
		queryFn: getDashboard,
		queryKey: ["dashboard"],
	});
};
