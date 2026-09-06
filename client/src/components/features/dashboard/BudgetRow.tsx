import { formatKWD } from "../../../lib/utils";
import ProgressBar from "../../ui/ProgressBar";

type BudgetRowProps = {
	category: string;
	spent: number;
	limit: number;
	percent: number;
};

function BudgetRow({ category, spent, limit, percent }: BudgetRowProps) {
	const color =
		percent < 75
			? "hsla(160, 84%, 39%, 1)"
			: percent >= 75 && percent < 100
				? "hsla(45, 93%, 47%, 1)"
				: "hsla(0, 84%, 60%, 1)";

	return (
		<div className="grid gap-2">
			<div className="flex items-center justify-between">
				<p className="text-caption-lg text-text-primary">{category}</p>
				<p className="text-caption-md text-text-secondary">
					{formatKWD(spent)}/{formatKWD(limit)}
				</p>
			</div>
			<ProgressBar progress={percent} color={color} />
			<p className="text-caption-sm text-input-placeholder">
				{percent.toFixed(0)}% Used
			</p>
		</div>
	);
}

export default BudgetRow;
