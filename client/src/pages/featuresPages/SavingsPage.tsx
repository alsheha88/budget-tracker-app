import { Button } from "../../components/ui/Button";
import { useGetSavingsStats } from "../../hooks/savings/savings";
import { ArrowDownLeftIcon, PiggyBank, Wallet } from "lucide-react";
import { Card } from "../../components/ui/Card";
import SavingsCard from "../../components/features/savings/SavingsCard";
import SavingsForm from "../../components/forms/savingsForm/SavingsForm";
import { useState } from "react";
import type { SavingsResponse } from "../../../../shared/types";
import ContributionForm from "../../components/forms/savingsForm/ContributionForm";

type SavingsItem = SavingsResponse["savings"][number];

function SavingsPage() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isContributionOpen, setIsContributionOpen] = useState(false);
	const [goal, setGoal] = useState<SavingsItem | null>(null);
	const [type, setType] = useState<"Add" | "Edit">("Add");
	const { data: savingsStats } = useGetSavingsStats();
	const savings = savingsStats?.savings;

	return (
		<div className="grid gap-7">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-1">
					<h2 className="text-h2 text-text-primary">Savings Goals</h2>
					<p className="text-caption-lg text-text-secondary">
						Track and allocate your funds for upcoming life milestones.
					</p>
				</div>
				<Button
					size="lg"
					type="button"
					onClick={() => {
						setIsFormOpen(true);
						setType("Add");
					}}>
					Create Goal
				</Button>
			</div>
			<div className="flex flex-col gap-3.5">
				<p className="text-button-md text-text-primary">
					Your Savings Milestones
				</p>
				<div className="grid grid-cols-3 gap-4">
					<Card className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<p className="text-text-secondary text-caption-lg">
								Total Target Savings Pool
							</p>
							<div className="p-1 rounded-sm bg-category-groceries">
								<Wallet className="stroke-interactive-primary" />
							</div>
						</div>
						<h2 className="text-h2 text-text-primary">
							{savingsStats?.summary.totalTarget.toFixed(1)} KWD
						</h2>
					</Card>
					<Card className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<p className="text-text-secondary text-caption-lg">
								Total Amount Saved{" "}
							</p>
							<div className="p-1 rounded-sm bg-category-groceries">
								<PiggyBank className="stroke-interactive-primary" />
							</div>
						</div>
						<h2 className="text-h2 text-text-primary">
							{savingsStats?.summary.totalSaved.toFixed(1)} KWD
						</h2>
					</Card>
					<Card className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<p className="text-text-secondary text-caption-lg">
								Overall Progress
							</p>
							<div className="p-1 rounded-sm bg-category-dining">
								<ArrowDownLeftIcon className="stroke-interactive-destructive" />
							</div>
						</div>
						<h2 className="text-h2 text-text-primary">
							{savingsStats?.summary.percent.toFixed(1)}%
						</h2>
					</Card>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{savings?.map((s) => (
					<SavingsCard
						key={s.id}
						data={s}
						setGoal={setGoal}
						setIsOpen={setIsFormOpen}
						setType={setType}
						setIsContributionOpen={setIsContributionOpen}
					/>
				))}
			</div>
			<SavingsForm
				type={type}
				isOpen={isFormOpen}
				setIsOpen={setIsFormOpen}
				savings={goal!}
			/>
			<ContributionForm
				isOpen={isContributionOpen}
				setIsOpen={setIsContributionOpen}
				savings={goal!}
			/>
		</div>
	);
}

export default SavingsPage;
