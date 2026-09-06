//React hooks imports
import { useState } from "react";
// Components imports
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import BudgetHealth from "../../components/features/budgets/BudgetHealth";
import ProgressBar from "../../components/ui/ProgressBar";
import BudgetCard from "../../components/features/budgets/BudgetCard";
import BudgetForm from "../../components/forms/budgetForms/BudgetForm";
import Modal from "../../components/ui/Modal";
import LoadingState from "../../components/state/LoadingState";
import ErrorState from "../../components/state/ErrorState";
import EmptyState from "../../components/state/EmptyState";
// Custom hooks imports
import {
	useDeleteBudget,
	useGetBudgetsStats,
} from "../../hooks/budgets/useBudgets";
// Types imports
import type { BudgetsStatsResponse } from "../../../../shared/types";
// Helpers imports
import { formatKWD } from "../../lib/utils";
// Icons imports
import { PieChart } from "lucide-react";

type Budget = BudgetsStatsResponse["budgetStats"][number];

function BudgetsPage() {
	const [type, setType] = useState<"Add" | "Edit">("Add");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [budget, setBudget] = useState<Budget | null>(null);
	const { data: budgets, isError, isPending, refetch } = useGetBudgetsStats();
	const { mutate: deleteBudget } = useDeleteBudget();

	if (isPending) return <LoadingState />;
	if (isError)
		return (
			<ErrorState
				title={"Something Went Wrong!"}
				message={"We couldn't load your budgets"}
				onAction={refetch}
			/>
		);
	const budgetHealth = budgets.budgetHealthRate;

	const handleDelete = () => {
		deleteBudget(budget!.id);
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
				<Button
					size="lg"
					type="button"
					onClick={() => {
						setType("Add");
						setBudget(null);
						setIsFormOpen(true);
					}}>
					Create Budget
				</Button>
			</div>
			{budgets.budgetStats.length === 0 ? (
				<EmptyState
					icon={<PieChart />}
					title={"No Budgets Created"}
					message={"Your budgets will appear here once you create them"}
					btnText="Create Budget"
					onAction={() => {
						setIsFormOpen(true);
						setType("Add");
					}}
				/>
			) : (
				<>
					<Card className="grid grid-cols-3 gap-4 items-center">
						<BudgetHealth budgetHealth={budgetHealth} />
						<div className="flex items-center gap-6">
							<div className="flex flex-col gap-1.5">
								<p className="text-caption-md text-sidebar-foreground">
									Total Allocated
								</p>
								<p className="text-h4 text-text-primary">
									{formatKWD(budgets.totalAllocated)}
								</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<p className="text-caption-md text-interactive-destructive">
									Spent
								</p>
								<p className="text-h4 text-interactive-destructive">
									{formatKWD(budgets.spentBudget)}
								</p>
							</div>
							<div className="flex flex-col gap-1.5">
								<p className="text-caption-md text-interactive-primary">
									Remaining
								</p>
								<p className="text-h4 text-interactive-primary">
									{formatKWD(budgets.remaining)}
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
				</>
			)}
			<BudgetForm
				type={type}
				isOpen={isFormOpen}
				setIsOpen={setIsFormOpen}
				budget={budget}
			/>
			{budget && (
				<>
					<Modal
						title={`Delete ${budget.name}`}
						content={`Are you sure you want to delete ${budget.name}? this action cannot be undone`}
						btnContent={"Delete"}
						type={"delete"}
						open={isModalOpen}
						onDelete={handleDelete}
						onOpenChange={setIsModalOpen}
					/>
				</>
			)}
		</div>
	);
}

export default BudgetsPage;
