import { Card } from "../../ui/Card";
import Badge from "../../ui/Badge";
import { Edit2 } from "lucide-react";
import { capitalizeFirstLetter, formatDateShort, formatKWD } from "../../../lib/utils";
import type { AccountStatsResponse } from "../../../../../shared/types";

type AccountItem = AccountStatsResponse["accounts"][number];

const accountTypeColors: Record<AccountItem["accountType"], string> = {
	cash: "#22c55e",
	checking: "#eab308",
	savings: "#3b82f6",
	credit: "#ef4444",
	investment: "#06b6d4",
	loan: "#f97316",
};

type AccountCardProps = {
	account: AccountItem;
	onEdit: (account: AccountItem) => void;
};

function AccountCard({ account, onEdit }: AccountCardProps) {
	return (
		<Card className="flex flex-col gap-4 flex-1">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<p className="text-button-lg text-text-primary">{account.name}</p>
					<button
						className="text-text-secondary hover:text-text-tertiary cursor-pointer"
						type="button"
						onClick={() => onEdit(account)}>
						<Edit2 size={16} />
					</button>
				</div>
				<Badge
					name={capitalizeFirstLetter(account.accountType)}
					color={accountTypeColors[account.accountType]}
				/>
			</div>
			<div className="flex flex-col gap-1.5">
				<p className="text-button-lg text-text-primary">
					{formatKWD(account.balance)}
				</p>
				<p className="text-caption-sm text-text-secondary">
					{account.transactionDate
						? `Last transaction: ${formatDateShort(account.transactionDate.toString())}`
						: "No transactions yet"}
				</p>
			</div>
		</Card>
	);
}

export default AccountCard;