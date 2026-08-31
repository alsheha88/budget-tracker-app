import { useDashboard } from "../../hooks/dashboard/useDashboard";
import TransactionsStats from "../../components/features/dashboard/TransactionsStats";
import CashFLow from "../../components/features/dashboard/CashFlow";
import SpendingByCategory from "../../components/features/dashboard/SpendingByCategory";
import RecentTransactions from "../../components/features/dashboard/RecentTransactions";
import MonthlyBudget from "../../components/features/dashboard/MonthlyBudget";
import SavingsStats from "../../components/features/dashboard/SavingsStats";
import { useGetUser } from "../../hooks/auth/useAuth";

function DashboardPage() {
	const { data, isError, isPending } = useDashboard();
	const {data:user} = useGetUser();
	if (!data) return null;
	if (!user) return null;
	const recentTransactions = data.recentTransactions;
	const transactionsStats = data.transactionsStats;
	const budgetStats = data.budgetStats;
	const cashFlow = data.cashFlow;
	const savingsStats = data.savingsStats;
	const spendingByCategory = data.spendingByCategory;

	const firstName = user.fullName.split(" ")[0];
	return (
		<div className="grid gap-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-1">
					<h2 className="text-h2 text-text-primary">Hello, {firstName}</h2>
					<p className="text-caption-lg text-text-secondary">
						Here is your financial status for today.
					</p>
				</div>
				
			</div>
			<TransactionsStats
				income={transactionsStats.income}
				expenses={transactionsStats.expenses}
				balance={transactionsStats.balance}
			/>
			<div className="grid grid-cols-[1.5fr_1fr] gap-4">
				<CashFLow data={cashFlow} />
				<SpendingByCategory data={spendingByCategory} />
			</div>
			<div className="grid grid-cols-[1.5fr_1fr] gap-4">
			<RecentTransactions data={recentTransactions} />
				<MonthlyBudget data={budgetStats} />
			</div>
			<SavingsStats data={savingsStats} />
		</div>
	);
}

export default DashboardPage;
