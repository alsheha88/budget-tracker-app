import { Card } from "../../ui/Card";
import type { DashboardStats } from "../../../../../shared/types";
import { NavLink } from "react-router-dom";
import TransactionRow from "./TransactionRow";

type RecentTransactionsProps = {
	data: DashboardStats["recentTransactions"];
};

function RecentTransactions({ data }: RecentTransactionsProps) {
	return (
		<Card className="grid gap-3">
			<div className="flex items-center justify-between">
				<p className="text-text-primary text-button-lg">Recent Transactions</p>
				<NavLink
					to={"/transactions"}
					className={"text-text-secondary text-caption-sm hover:text-interactive-primary"}>
					View all
				</NavLink>
			</div>
			<div>
				{data.map((i) => (
					<div key={i.id}>
						<TransactionRow
							transactionName={i.merchant}
							category={i.category?.name ?? "transfer"}
							color={i.category?.color ?? "#6b7280"}
							date={i.date.toString()}
							amount={Number(i.amount)}
						/>
						<hr className="text-border-default" />
					</div>
				))}
			</div>
		</Card>
	);
}

export default RecentTransactions;
