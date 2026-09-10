import { Card } from "../../ui/Card";
import Badge from "../../ui/Badge";
import Chart from "../../ui/Chart";
import type { DashboardStats } from "../../../../../shared/types";

type cashFlow = {
	data: DashboardStats["cashFlow"]
}

function CashFLow({data}:cashFlow) {
	return (
		<Card className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-1">
					<p className="text-button-lg text-text-primary">Cash Flow</p>
				</div>
                <div className="flex items-center gap-4">
                    <Badge name={"Income"} color={"#10b77f"} />
                    <Badge name={"Expenses"} color={"#ef4343"} />
                </div>
			</div>
			<div>
            <Chart data={data} />

			</div>
		</Card>
	);
}

export default CashFLow;
