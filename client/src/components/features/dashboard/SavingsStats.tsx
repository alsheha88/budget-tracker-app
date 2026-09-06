import type { DashboardStats } from "../../../../../shared/types";
import { Card } from "../../ui/Card";
import SavingsCard from "./SavingsCard";

type SavingsStatsProps = {
	data: DashboardStats["savingsStats"];
};

function SavingsStats({ data }: SavingsStatsProps) {
	return (
		<Card className="flex flex-col gap-5">
			<p className="text-button-lg text-text-primary">Savings Goals</p>
			<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
				{data.map((i) => (
					<SavingsCard
						key={i.id}
						name={i.name}
						saved={i.saved}
						target={Number(i.target)}
						percentage={i.percent}
					/>
				))}
			</div>
		</Card>
	);
}

export default SavingsStats;
