import { ArrowDownLeftIcon, ArrowUpRight, Wallet } from "lucide-react";
import { Card } from "../../ui/Card";
import { formatKWD } from "../../../lib/utils";

type TransactionsStatsProps = {
	income: number;
	expenses: number;
	balance: number;
};

function TransactionsStats({
	income,
	expenses,
	balance,
}: TransactionsStatsProps) {
	return (
		<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Current Balance</p>
					<div className="p-1 rounded-sm bg-category-groceries">
						<Wallet className="stroke-interactive-primary" />
					</div>
				</div>
				<h2 className="text-h2 text-text-primary">{formatKWD(balance)}</h2>
			</Card>
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Monthly Income</p>

					<div className="p-1 rounded-sm bg-category-groceries">
						<ArrowUpRight className="stroke-interactive-primary" />
					</div>
				</div>
				<h2 className="text-h2 text-text-primary">{formatKWD(income)}</h2>
			</Card>
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">
						Monthly Spending
					</p>

					<div className="p-1 rounded-sm bg-category-dining">
						<ArrowDownLeftIcon className="stroke-interactive-destructive" />
					</div>
				</div>
				<h2 className="text-h2 text-text-primary">{formatKWD(expenses)}</h2>
			</Card>
		</div>
	);
}

export default TransactionsStats;
