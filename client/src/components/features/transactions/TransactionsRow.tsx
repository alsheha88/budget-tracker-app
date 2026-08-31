import { capitalizeFirstLetter, formatDateShort } from "../../../lib/utils";
import { getCategoryIcon } from "../../../lib/icons";
import Badge from "../../ui/Badge";

type TransactionsTableProps = {
	date: Date;
	name: string;
	description: string;
	category: string;
	color: string;
	account: string;
	amount: number;
};

function TransactionsRow({
	date,
	name,
	description,
	category,
	color,
	account,
	amount,
}: TransactionsTableProps) {
	const Icon = getCategoryIcon(category);
	return (
		<div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-center justify-between py-3.5 px-4" role="row">
			<p className="text-caption-lg text-sidebar-foreground">
				{formatDateShort(date.toString())}
			</p>
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 flex items-center justify-center rounded-sm bg-surface-active">
					<Icon color={color || "hsla(160, 84%, 39%, 1)"} size={18} />
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-button-md text-text-primary">{name}</p>
					<p className="text-caption-md text-sidebar-foreground">
						{description}
					</p>
				</div>
			</div>
			<Badge name={capitalizeFirstLetter(category)} color={color} />
			<p className="text-caption-lg text-sidebar-foreground">{account}</p>
			<p className="text-button-md text-text-primary">{amount} KWD</p>
		</div>
	);
}

export default TransactionsRow;
