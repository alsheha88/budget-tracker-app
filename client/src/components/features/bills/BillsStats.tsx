import { ArrowDownLeftIcon, ArrowUpRight, Wallet } from "lucide-react";
import { Card } from "../../ui/Card";
import { formatKWD } from "../../../lib/utils";

type BillsStatsProps = {
	dueThisWeek: number;
	dueThisMonth: number;
	overdue: number;
};

function BillsStats({ dueThisMonth, dueThisWeek, overdue }: BillsStatsProps) {
	return (
		<div className="grid grid-cols-3 gap-4">
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Due This Week</p>
					<div className="p-1 rounded-sm bg-category-groceries">
						<Wallet className="stroke-interactive-primary" />
					</div>
				</div>
				<h2 className="text-h2 text-text-primary">
					{formatKWD(dueThisWeek)} 
				</h2>
			</Card>
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Due This Month</p>

					<div className="p-1 rounded-sm bg-category-groceries">
						<ArrowUpRight className="stroke-interactive-primary" />
					</div>
				</div>
				<h2 className="text-h2 text-text-primary">
					{formatKWD(dueThisMonth)}
				</h2>
			</Card>
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Overdue</p>

					<div className="p-1 rounded-sm bg-category-dining">
						<ArrowDownLeftIcon className="stroke-interactive-destructive" />
					</div>
				</div>
				<h2 className="text-h2 text-text-primary">{formatKWD(overdue)}</h2>
			</Card>
		</div>
	);
}

export default BillsStats;
