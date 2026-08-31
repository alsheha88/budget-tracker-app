import { Card } from "../../components/ui/Card";
import {
	useDeleteBudget,
	useGetBudgetsStats,
} from "../../hooks/budgets/useBudgets";
import { Button } from "../../components/ui/Button";
import BudgetHealth from "../../components/features/budgets/BudgetHealth";
import ProgressBar from "../../components/ui/ProgressBar";
import BudgetCard from "../../components/features/budgets/BudgetCard";
import { useState } from "react";
import BudgetForm from "../../components/forms/budgetForms/BudgetForm";
import type { BudgetsStatsResponse } from "../../../../shared/types";
import Modal from "../../components/ui/Modal";

type Budget = BudgetsStatsResponse["budgetStats"][number];

function BudgetsPage() {
	const [type, setType] = useState<"Add" | "Edit">("Add");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [budget, setBudget] = useState<Budget | null>(null);
	const { data: budgets, isError, isPending } = useGetBudgetsStats();
	const { mutate: deleteBudget } = useDeleteBudget();
	if (!budgets) return null;
	if (!budget) return null;
	const budgetHealth = budgets.budgetHealthRate;

	const handleDelete = () => {
		deleteBudget(budget.id);
		setIsModalOpen(false);
	};

	const color =
		budgetHealth < 75
			? "hsla(160, 84%, 39%, 1)"
			: budgetHealth >= 75 && budgetHealth < 100
				? "hsla(45, 93%, 47%, 1)"
				: "hsla(0, 84%, 60%, 1)";
	return (
		<div className="grid gap-7">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-1">
					<h2 className="text-h2 text-text-primary">Budgets</h2>
					<p className="text-caption-lg text-text-secondary">
						Manage and track your monthly budget allocation.
					</p>
				</div>
				<Button size="lg" type="button" onClick={() => setIsFormOpen(true)}>
					Create Budget
				</Button>
			</div>
			<Card className="grid grid-cols-3 gap-4 items-center">
				<BudgetHealth budgetHealth={budgetHealth} />
				<div className="flex items-center gap-6">
					<div className="flex flex-col gap-1.5">
						<p className="text-caption-md text-sidebar-foreground">
							Total Allocated
						</p>
						<p className="text-h4 text-text-primary">
							{budgets.totalAllocated.toFixed(1)} KWD
						</p>
					</div>
					<div className="flex flex-col gap-1.5">
						<p className="text-caption-md text-interactive-destructive">
							Spent
						</p>
						<p className="text-h4 text-interactive-destructive">
							{budgets.spentBudget.toFixed(1)} KWD
						</p>
					</div>
					<div className="flex flex-col gap-1.5">
						<p className="text-caption-md text-interactive-primary">
							Remaining
						</p>
						<p className="text-h4 text-interactive-primary">
							{budgets.remaining.toFixed(1)} KWD
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex justify-between items-center">
						<p className="text-caption-lg text-text-primary">
							Overall Usage Rate
						</p>
						<p className="text-caption-lg" style={{ color: color }}>
							{budgets.overAllUsageRate.toFixed(0)}%
						</p>
					</div>
					<ProgressBar progress={budgets.overAllUsageRate} color={color} />
				</div>
			</Card>
			<div className="grid gap-4">
				<p className="text-h4 text-text-primary">Category Budgets</p>
				<div className="grid grid-cols-3 gap-4">
					{budgets.budgetStats.map((i) => (
						<BudgetCard
							key={i.id}
							budget={i}
							setBudget={setBudget}
							setType={setType}
							setIsFormOpen={setIsFormOpen}
              setIsModalOpen={setIsModalOpen}
						/>
					))}
				</div>
			</div>
			<BudgetForm
				type={type}
				isOpen={isFormOpen}
				setIsOpen={setIsFormOpen}
				budget={budget!}
			/>
      <Modal
					title={`Delete ${budget.name}`}
					content={`Are you sure you want to delete ${budget.name}? this action cannot be undone`}
					btnContent={"Delete"}
					type={"delete"}
					open={isModalOpen}
					onDelete={handleDelete}
					onOpenChange={setIsModalOpen}
				/>
		</div>
	);
}

export default BudgetsPage;
