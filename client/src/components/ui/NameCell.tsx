import Badge from "./Badge";
import { getCategoryIcon } from "../../lib/icons";
import { capitalizeFirstLetter } from "../../lib/utils";

type Props = {
	name: string;
	color: string;
	category: string;
};

function NameCell({ name, color, category }: Props) {
	const Icon = getCategoryIcon(category);
	return (
		<div className="flex items-center gap-3">
			<div
				className="w-10 h-10 flex items-center justify-center rounded-sm"
				style={{
					backgroundColor: `${color || "#10B981"}26`,
				}}>
				<Icon color={color} size={18} />
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-button-md text-text-primary">{name}</p>
				<Badge name={capitalizeFirstLetter(category)} color={color} />
			</div>
		</div>
	);
}

export default NameCell;
