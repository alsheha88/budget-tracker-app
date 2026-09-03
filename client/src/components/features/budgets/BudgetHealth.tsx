type BudgetHealthProps = {
	budgetHealth: number;
};

function BudgetHealth({ budgetHealth }: BudgetHealthProps) {
	const circumference = 2 * Math.PI * 40;
	const offset = circumference * (1 - budgetHealth / 100);

	const color =
		budgetHealth < 75
			? "hsla(0, 84%, 60%, 1)"
			: budgetHealth >= 75 && budgetHealth < 100
				? "hsla(45, 93%, 47%, 1)"
				: "hsla(160, 84%, 39%, 1)";
	return (
		<div className="flex items-center gap-2">
			<svg width={100} height={100} viewBox="0 0 100 100">
				<circle
					cx="50"
					cy="50"
					r="40"
					fill="none"
					stroke="#333"
					strokeWidth="8"
				/>
				<circle
					cx="50"
					cy="50"
					r="40"
					fill="none"
					stroke={color}
					strokeWidth="8"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					transform="rotate(-90 50 50)"
				/>
				<text
					fill="hsla(0, 0%, 98%, 1)"
					fontSize={"13px"}
					x={50}
					y={50}
					textAnchor="middle"
					dominantBaseline="middle">
					{budgetHealth.toFixed(0)}%
				</text>
			</svg>
			<div className="flex flex-col gap-2">
				<p className="text-text-primary text-button-md">Budget Health</p>
				<p className="text-sidebar-foreground text-caption-md">
					Budget Health Score
				</p>
			</div>
		</div>
	);
}

export default BudgetHealth;
