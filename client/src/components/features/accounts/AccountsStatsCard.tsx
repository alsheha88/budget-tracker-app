import { ArrowDownLeftIcon, PiggyBank, Wallet } from "lucide-react";
import { Card } from "../../ui/Card";
import { formatKWD } from "../../../lib/utils";

type AccountStatsProps = {
    total: number;
    assets: number;
    liabilities: number;
}

function AccountsStatsCard({total, assets, liabilities}:AccountStatsProps) {
	return (
		<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Total Balance</p>
					<div className="p-1 rounded-sm bg-category-groceries">
						<Wallet className="stroke-interactive-primary" />
					</div>
				</div>
				<h2 className="text-h3 text-text-primary">
					{formatKWD(total)}
				</h2>
			</Card>
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">Total Assets</p>
					<div className="p-1 rounded-sm bg-category-groceries">
						<PiggyBank className="stroke-interactive-primary" />
					</div>
				</div>
				<h2 className="text-h3 text-text-primary">
					{formatKWD(assets)}
				</h2>
			</Card>
			<Card className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-text-secondary text-caption-lg">
						Total Liabilities
					</p>
					<div className="p-1 rounded-sm bg-category-dining">
						<ArrowDownLeftIcon className="stroke-interactive-destructive" />
					</div>
				</div>
				<h2 className="text-h3 text-text-primary">
					{formatKWD(liabilities)}
				</h2>
			</Card>
		</div>
	);
}

export default AccountsStatsCard;
