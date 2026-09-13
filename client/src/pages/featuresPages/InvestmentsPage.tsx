import InvestmentsStatsCard from "../../components/features/investments/InvestmentsStatsCard";
import EmptyState from "../../components/state/EmptyState";
import ErrorState from "../../components/state/ErrorState";
import LoadingState from "../../components/state/LoadingState";
import { useGetInvestmentsStats } from "../../hooks/investments/investments";
import { TrendingUp } from "lucide-react";

function InvestmentsPage() {
	const { data, isError, isPending, refetch } = useGetInvestmentsStats();

	if (isPending) return <LoadingState />;
	if (isError)
		return (
			<ErrorState
				title={"Something Went Wrong!"}
				message={"We couldn't load your investments"}
				onAction={refetch}
			/>
		);
	if (!data.investmentStats.length)
		return (
			<div className="grid place-items-center h-dvh">
				<EmptyState
					icon={<TrendingUp color="#10b77f" />}
					title={"No investments to display"}
					message={"Click the button below to start tracking your investments"}
                    btnText="Create Investment"
				/>
			</div>
		);

	const stats = data.summary;

	return (
		<div className="grid gap-7">
			<InvestmentsStatsCard
				totalValue={stats.totalValue}
				totalInvested={stats.totalInvested}
				totalGainLoss={stats.totalGainLoss}
				totalGainLossPercent={stats.totalGainLossPercent}
			/>
		</div>
	);
}

export default InvestmentsPage;
