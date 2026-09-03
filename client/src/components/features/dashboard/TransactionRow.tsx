import { formatDateShort } from "../../../lib/utils";
import NameCell from "../../ui/NameCell";

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
	return (
		<div className="py-3 flex items-center justify-between">
			<NameCell name={transactionName} color={color} category={category} />
			<div className="flex flex-col gap-1">
				<p
					style={{
						fontSize: "var(--text-button-md)",
						color:
							amount > 0 ? "hsla(160, 84%, 39%, 1)" : "hsla(0, 84%, 60%, 1)",
						textAlign: "end",
					}}>
					{amount.toFixed(1)} KWD
				</p>
				<p className="text-caption-md text-text-secondary text-end">
					{formatDateShort(date)}
				</p>
			</div>
		</div>
	);
}

export default TransactionRow;
