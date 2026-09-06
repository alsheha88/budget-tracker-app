import type { DashboardStats } from "../../../../shared/types";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { formatKWD } from "../../lib/utils";

type PieChartProps = {
	data: DashboardStats["spendingByCategory"];
};

function PieChartComponent({ data }: PieChartProps) {
	const { otherCategories } = data;
	const { topFiveCategories } = data;
	const topFiveTotal = topFiveCategories.reduce(
		(acc, b) => (acc += b.amount),
		0,
	);
	const spent = topFiveTotal + otherCategories.amount;
	const spending = [
		...topFiveCategories.map((c) => ({ ...c, fill: c.color })),
		{ ...otherCategories, fill: "#6b7280" },
	];

	return (
		<div className="relative">
			<ResponsiveContainer width={"100%"} aspect={1} className={"relative"}>
				<PieChart>
					<Pie
						data={spending}
						dataKey="amount"
						outerRadius="80%"
						innerRadius="60%"
					/>
				<Tooltip
					contentStyle={{
						backgroundColor: "hsla(240, 7%, 8%, 1)",
						borderRadius: 4,
						border: "1px solid hsla(240, 4%, 16%, 1)",
					}}
				/>
				</PieChart>
			<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
				<span className="text-text-secondary text-caption-lg">Spent</span>
				<span className="text-h4 text-text-primary">
					{formatKWD(spent)}
				</span>
			</div>
			</ResponsiveContainer>

		</div>
	);
}

export default PieChartComponent;
