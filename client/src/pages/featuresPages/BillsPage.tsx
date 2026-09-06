// React hooks imports
import { useState } from "react";
// Components imports
import BillsStats from "../../components/features/bills/BillsStats";
import BillsTable from "../../components/features/bills/BillsTable";
import { Button } from "../../components/ui/Button";
import BillsForm from "../../components/forms/billsForms/BillsForm";
import ErrorState from "../../components/state/ErrorState";
import LoadingState from "../../components/state/LoadingState";
import EmptyState from "../../components/state/EmptyState";
// Custom hooks imports
import { useGetBillsStats } from "../../hooks/bills/bills";
import type { BillsStatsRespoonse } from "../../../../shared/types";
// Icon imports
import { CircleDollarSign } from "lucide-react";

type Bill = BillsStatsRespoonse["bills"][number];

function BillsPage() {
	const [type, setType] = useState<"Add" | "Edit">("Add");
	const [bill, setBill] = useState<Bill | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const { data, isError, isPending, refetch } = useGetBillsStats();
	if (isPending) return <LoadingState />;
	if (isError)
		return (
			<ErrorState
				title={"Something Went Wrong!"}
				message={"We couldn't load your bills"}
				onAction={refetch}
			/>
		);
	const bills = data.bills;
	const summary = data.summary;
	return (
		<div className="grid gap-7">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-1">
					<h2 className="text-h2 text-text-primary">Bills</h2>
					<p className="text-caption-lg text-text-secondary">
						Manage your recurring payments, contracts, and subscription
						auto-renewals.
					</p>
				</div>
				<Button
					size="lg"
					type="button"
					onClick={() => {
						setType("Add");
						setIsFormOpen(true);
					}}>
					Create Bill
				</Button>
			</div>
			{bills.length === 0 ? (
				<EmptyState
					icon={<CircleDollarSign />}
					title={"No Bills Added"}
					message={"Your bills will appear here once you add them"}
					btnText="Add Bill"
					onAction={() => {
						setType("Add");
						setIsFormOpen(true);
					}}
				/>
			) : (
				<>
					<BillsStats
						dueThisWeek={summary.upcomingWeeklyBills}
						dueThisMonth={summary.monthlyBills}
						overdue={summary.overdueBills}
					/>
					<BillsTable
						bills={bills}
						setBill={setBill}
						setIsFormOpen={setIsFormOpen}
						setType={setType}
					/>
				</>
			)}
			<BillsForm
				type={type}
				bill={bill}
				setIsFormOpen={setIsFormOpen}
				isFormOpen={isFormOpen}
			/>
		</div>
	);
}

export default BillsPage;
