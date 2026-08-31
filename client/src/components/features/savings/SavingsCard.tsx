import { useState, type SetStateAction } from "react";
import type { SavingsResponse } from "../../../../../shared/types";
import { formatDateShort } from "../../../lib/utils";
import Badge from "../../ui/Badge";
import { Card } from "../../ui/Card";
import ProgressBar from "../../ui/ProgressBar";
import { Ellipsis } from "lucide-react";
import * as DropdownMenu from "radix-ui/dropdown-menu";
import DropdownMenuComponent from "../../ui/Dropdown";
import { useDeleteSavings } from "../../../hooks/savings/savings";
import Modal from "../../ui/Modal";

type SavingsItem = SavingsResponse["savings"][number];

type SavingsProps = {
	data: SavingsItem;
	setGoal: (goal: SavingsItem | null) => void;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	setIsContributionOpen: React.Dispatch<SetStateAction<boolean>>;
	setType: (type: "Add" | "Edit") => void;
};

function SavingsCard({
	data,
	setGoal,
	setIsOpen,
	setType,
	setIsContributionOpen,
}: SavingsProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const progressColor =
		data.percent <= 25
			? "#EF4444"
			: data.percent > 25 && data.percent < 75
				? "#F59E0B"
				: "#10B981";
	const { mutate: deleteSavings } = useDeleteSavings();

	const handleClick = () => {
		setType("Edit");
		setIsOpen(true);
		setGoal(data);
	};
	const handleDelete = () => {
		deleteSavings(data.id);
		setIsModalOpen(false);
	};
	return (
		<Card className="grid gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="flex flex-col gap-1">
						<p className="text-button-lg text-text-primary">{data.name}</p>
						<p className="text-caption-md text-input-placeholder">
							{data.description}
						</p>
					</div>
				</div>
				<DropdownMenuComponent
					trigger={
						<Ellipsis className="text-input-placeholder cursor-pointer" />
					}>
					<DropdownMenu.Item
						className="p-2 rounded-sm hover:outline-none hover:border-none cursor-pointer hover:bg-badge-default"
						onSelect={() => {
							setIsContributionOpen(true);
							setGoal(data);
						}}>
						Contribute
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onSelect={handleClick}
						className="p-2 rounded-sm hover:outline-none hover:border-none cursor-pointer hover:bg-badge-default">
						Edit
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onSelect={() => setIsModalOpen(true)}
						className="p-2 rounded-sm hover:outline-none hover:border-none cursor-pointer hover:bg-badge-default">
						Delete
					</DropdownMenu.Item>
				</DropdownMenuComponent>
				<Modal
					title={`Delete ${data.name}`}
					content={`Are you sure you want to delete ${data.name}? this action cannot be undone`}
					btnContent={"Delete"}
					type={"delete"}
					open={isModalOpen}
					onDelete={handleDelete}
					onOpenChange={setIsModalOpen}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<ProgressBar progress={data.percent} color={data.color} />
				<div className="flex items-center justify-between">
					<p className="text-caption-lg text-sidebar-foreground">
						Saved:{" "}
						<span className="text-button-md text-text-primary">
							KWD {data.saved}
						</span>
					</p>
					<p className="text-caption-lg text-sidebar-foreground">
						Target:{" "}
						<span className="text-button-md text-text-primary">
							KWD {Number(data.target)}
						</span>
					</p>
				</div>
			</div>
			<hr className="text-border-default" />
			<div className="flex items-center justify-between">
				<p className="text-caption-lg text-sidebar-foreground">
					Est. Date:{" "}
					<span className="text-button-md text-text-primary">
						{formatDateShort(new Date(data.targetDate!).toDateString())}
					</span>
				</p>
				<Badge
					name={`${data.percent.toFixed(1).toString()}%`}
					color={progressColor}
				/>
			</div>
		</Card>
	);
}

export default SavingsCard;
