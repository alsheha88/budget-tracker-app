import { Ellipsis } from "lucide-react";
import DropdownMenuComponent from "../../ui/Dropdown";
import * as DropdownMenu from "radix-ui/dropdown-menu";
import Modal from "../../ui/Modal";
import { Card } from "../../ui/Card";
import ProgressBar from "../../ui/ProgressBar";
import type { BudgetsStatsResponse } from "../../../../../shared/types";
import { useGetCategories } from "../../../hooks/categories/useCategories";
import { getCategoryIcon } from "../../../lib/icons";
import type { SetStateAction } from "react";

type Budget = BudgetsStatsResponse["budgetStats"][number];
type BudgetCardProps = {
	budget: Budget;
	setBudget: (budget: Budget | null) => void;
	setType: (type: "Add" | "Edit") => void;
    setIsFormOpen: React.Dispatch<SetStateAction<boolean>>;
    setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
};

function BudgetCard({ budget, setBudget, setType, setIsFormOpen, setIsModalOpen }: BudgetCardProps) {
	const { data: categories } = useGetCategories();
	const category = categories?.find((i) => i.id === budget.categoryId);
	if (!category) return null;
	const Icon = getCategoryIcon(category.name);

	const progressColor =
		budget.percent <= 75
			? "#10B981"
			: budget.percent > 75 && budget.percent < 90
				? "#F59E0B"
				: "#EF4444";
	return (
		<Card className="grid gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 flex items-center justify-center rounded-sm bg-surface-active">
						<Icon
							color={category.color || "hsla(160, 84%, 39%, 1)"}
							size={18}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-button-lg text-text-primary">{budget.name}</p>
						<p className="text-caption-md text-input-placeholder">
							{budget.name}
						</p>
					</div>
				</div>
				<DropdownMenuComponent
					trigger={
						<Ellipsis className="text-input-placeholder cursor-pointer" />
					}>
					<DropdownMenu.Item
						className="p-2 rounded-sm hover:outline-none hover:border-none cursor-pointer hover:bg-badge-default"
						onClick={() => {
							setType("Edit");
							setBudget(budget);
                            setIsFormOpen(true)
						}}>
						Edit
					</DropdownMenu.Item>
					<DropdownMenu.Item className="p-2 rounded-sm hover:outline-none hover:border-none cursor-pointer hover:bg-badge-default" onClick={() => {
							setBudget(budget);
                            setIsModalOpen(true)
						}}>
						Delete
					</DropdownMenu.Item>
				</DropdownMenuComponent>
				<Modal
					title={`Delete ${budget.name}`}
					content={`Are you sure you want to delete ${budget.name}? this action cannot be undone`}
					btnContent={"Delete"}
					type={"delete"}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<p className="text-caption-lg text-sidebar-foreground">
						KWD {budget.spent.toFixed(1)} / {Number(budget.limit).toFixed(1)}
					</p>
					<p style={{ color: progressColor, fontSize: "var(--fs-caption-lg)" }}>
						{budget.percent.toFixed(0)}%
					</p>
				</div>
				<ProgressBar progress={budget.percent} color={progressColor} />
			</div>
			<hr className="text-border-default" />
			<div className="flex items-center justify-between">
				<p className="text-caption-lg text-sidebar-foreground">Remaining</p>
				<span
					className={`text-button-md ${budget.remainingBalance < 0 ? "text-interactive-destructive" : "text-text-primary"} `}>
					KWD {budget.remainingBalance.toFixed(1)}
				</span>
			</div>
		</Card>
	);
}

export default BudgetCard;
