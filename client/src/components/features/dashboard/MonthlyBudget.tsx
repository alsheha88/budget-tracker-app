import type { DashboardStats } from "../../../../../shared/types";
import { Card } from "../../ui/Card";
import BudgetRow from "./BudgetRow";

type MonthlyBudgetProps = {
	data: DashboardStats["budgetStats"];
};

function MonthlyBudget({ data }: MonthlyBudgetProps) {
	return (
		<Card className="flex flex-col gap-5">
			<p className="text-button-lg text-text-primary">Monthly Budget</p>
			{data.map((i) => (
				<BudgetRow
					key={i.id}
					category={i.name}
					spent={i.spent}
					limit={Number(i.limit)}
					percent={i.percent}
				/>
			))}
		</Card>
	);
}

export default MonthlyBudget;
