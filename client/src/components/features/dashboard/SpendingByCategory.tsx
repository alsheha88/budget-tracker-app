import type { DashboardStats } from "../../../../../shared/types";
import { Card } from "../../ui/Card";
import PieChartComponent from "../../ui/PieChart";
import Badge from "../../ui/Badge";
import { capitalizeFirstLetter } from "../../../lib/helpers";
import WidgetEmpty from "../../state/EmptyWidget";

type SpendingByCategoryProps = {
	data: DashboardStats["spendingByCategory"];
};

function SpendingByCategory({ data }: SpendingByCategoryProps) {
	const { otherCategories } = data;
	const { topFiveCategories } = data;
	const spending = [
		...topFiveCategories.map((c) => ({ ...c, fill: c.color })),
		{ ...otherCategories, fill: "#6b7280" },
	];
	const hasData = topFiveCategories.length > 0;
	return (
		<Card>
			<p className="text-button-lg text-text-primary">Spending by Category</p>
			<div className="grid grid-cols-1 gap-1 h-full">
				{hasData ? (
					<>
						<PieChartComponent data={data} />
						<div className="grid grid-cols-2 gap-3">
							{spending.map((item) => (
								<div
									key={item.name}
									className="flex items-center justify-between gap-2">
									<Badge
										key={item.fill}
										name={capitalizeFirstLetter(item.name)}
										color={item.fill}
									/>
									<p className="text-caption-lg text-text-primary">
										{item.percent && item.percent.toFixed(0)}%
									</p>
								</div>
							))}
						</div>
					</>
				) : (
					<div className="h-full flex items-center justify-center">
						<WidgetEmpty message={"No data to display"} />
					</div>
				)}
			</div>
		</Card>
	);
}

export default SpendingByCategory;
