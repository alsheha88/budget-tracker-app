import Badge from "../../ui/Badge";
import { getCategoryIcon } from "../../../lib/icons";
import { formatDateShort } from "../../../lib/utils";
import { capitalizeFirstLetter } from "../../../lib/helpers";

type ListProps = {
	transactionName: string;
	category: string;
	color: string;
	date: string;
	amount: number;
};

function TransactionRow({
	transactionName,
	category,
	color,
	date,
	amount,
}: ListProps) {
	const Icon = getCategoryIcon(category);

	return (
		<div className="py-3 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 flex items-center justify-center rounded-sm bg-surface-active">
					<Icon color={color} size={18} />
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-button-md text-text-primary">{transactionName}</p>
					<Badge name={capitalizeFirstLetter(category)} color={color} />
				</div>
			</div>
			<div className="flex flex-col gap-1">
				<p
					style={{
						fontSize: "var(--text-button-md)",
						color:
							amount > 0 ? "hsla(160, 84%, 39%, 1)" : "hsla(0, 84%, 60%, 1)",
              textAlign: "end"
					}}>
					{amount.toFixed(1)} KWD
				</p>
				<p className="text-caption-md text-text-secondary text-end">{formatDateShort(date)}</p>
			</div>
		</div>
	);
}

export default TransactionRow;
