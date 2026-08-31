import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";
import type { DashboardStats } from "../../../../shared/types";
import { formatMonthShort } from "../../lib/utils";

type ChartProp = {
	data: DashboardStats["cashFlow"];
};

function Chart({ data }: ChartProp) {
	return (
		<ResponsiveContainer width="100%" aspect={1.618} className={"flex-1"}>
			<LineChart
				data={data}
				margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
				<XAxis
					dataKey={"month"}
					tickFormatter={(value) => formatMonthShort(value)}
				/>
				<YAxis />
				<Line dataKey="income" stroke="#10b77f" type="monotone" dot={false} />
				<Line dataKey="expense" stroke="#ef4343" type="monotone" dot={false} />
				<CartesianGrid strokeDasharray={"10 10"} stroke="#55555b" />
				<Tooltip
					contentStyle={{
						backgroundColor: "hsla(240, 7%, 8%, 1)",
						borderRadius: 4,
						border: "1px solid hsla(240, 4%, 16%, 1)",
					}}
					labelFormatter={(value) => formatMonthShort(value as unknown as Date)}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

export default Chart;
