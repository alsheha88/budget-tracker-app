import { capitalizeFirstLetter, formatDateShort } from "../../../lib/utils";
import { getCategoryIcon } from "../../../lib/icons";
import Badge from "../../ui/Badge";
import type { TransactionsResponse } from "../../../../../shared/types";

type Transaction = TransactionsResponse["transactions"][number];

type TransactionsTableProps = {
	setTransaction: (transaction: Transaction | null) => void;
	transaction: Transaction;
};

function TransactionsRow({ transaction }: TransactionsTableProps) {
	const Icon = getCategoryIcon(transaction.category?.name!);
	return (
		<div
			className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-center justify-between py-3.5 px-4"
			role="row">
			<p className="text-caption-lg text-sidebar-foreground">
				{formatDateShort(transaction.date.toString())}
			</p>
			<div className="flex items-center gap-3">
				<div
					className="w-10 h-10 flex items-center justify-center rounded-sm"
					style={{
						backgroundColor: `${transaction.category?.color || "#10B981"}26`,
					}}>
					<Icon color={transaction.category?.color || "#10B981"} size={18} />
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-button-md text-text-primary">
						{transaction.merchant}
					</p>
					<p className="text-caption-md text-sidebar-foreground">
						{transaction.description}
					</p>
				</div>
			</div>
			<Badge
				name={capitalizeFirstLetter(transaction.category?.name!)}
				color={transaction.category?.color!}
			/>
			<p className="text-caption-lg text-sidebar-foreground">
				{transaction.account.name}
			</p>
			<p className="text-button-md text-text-primary">
				{Number(transaction.amount)} KWD
			</p>
		</div>
	);
}

export default TransactionsRow;
