import { Card } from "../../ui/Card";

type SavingsCardProps = {
	name: string;
	saved: number;
	target: number;
	percentage: number;
};

function SavingsCard({ name, saved, target, percentage }: SavingsCardProps) {
	const circumference = 2 * Math.PI * 40;
	const offset = circumference * (1 - percentage / 100);
	const color =
		percentage < 25
			? "hsla(0, 84%, 60%, 1)"
			: percentage >= 25 && percentage < 75
				? "hsla(45, 93%, 47%, 1)"
				: "hsla(160, 84%, 39%, 1)";
	return (
		<Card size="md" className="flex items-center gap-3">
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
					{percentage}%
				</text>
			</svg>
			<div className="flex flex-col gap-1">
				<p className="text-caption-lg text-text-primary">{name}</p>
				<p className="text-caption-md text-sidebar-foreground">
					KWD {saved} / {target}
				</p>
			</div>
		</Card>
	);
}

export default SavingsCard;
