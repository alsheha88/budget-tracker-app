import { Card } from "../../ui/Card";
import { ArrowDownLeftIcon, PiggyBank, Wallet } from "lucide-react";
import { formatKWD } from "../../../lib/utils";

type InvestmentsStatsProps = {
	totalValue: number;
	totalInvested: number;
	totalGainLoss: number;
	totalGainLossPercent: number;
};

function InvestmentsStatsCard({
	totalValue,
	totalInvested,
	totalGainLoss,
	totalGainLossPercent,
}: InvestmentsStatsProps) {
	return (
		<div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Total Value</p>
					<div className="p-1 rounded-sm bg-category-groceries">
						<Wallet className="stroke-interactive-primary" />
					</div>
				</div>
				<h2 className="text-h3 text-text-primary">{formatKWD(totalValue)}</h2>
			</Card>
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Total Invested</p>
					<div className="p-1 rounded-sm bg-category-groceries">
						<PiggyBank className="stroke-interactive-primary" />
					</div>
				</div>
				<h2 className="text-h3 text-text-primary">
					{formatKWD(totalInvested)}
				</h2>
			</Card>
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Total Gain/Loss</p>
					<div className="p-1 rounded-sm bg-category-dining">
						<ArrowDownLeftIcon className="stroke-interactive-destructive" />
					</div>
				</div>
				<h2 className="text-h3 text-text-primary">
					{formatKWD(totalGainLoss)}
				</h2>
			</Card>
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Gain/Loss %</p>
					<div className="p-1 rounded-sm bg-category-dining">
						<ArrowDownLeftIcon className="stroke-interactive-destructive" />
					</div>
				</div>
				<h2 className="text-h3 text-text-primary">
					{totalGainLossPercent.toFixed(1)}
				</h2>
			</Card>
		</div>
	);
}

export default InvestmentsStatsCard;
