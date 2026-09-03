import { useState, type SetStateAction } from "react";
import BillsStats from "../../components/features/bills/BillsStats";
import BillsTable from "../../components/features/bills/BillsTable";
import { Button } from "../../components/ui/Button";
import { useGetBillsStats } from "../../hooks/bills/bills";
import BillsForm from "../../components/forms/billsForms/BillsForm";
import type { BillsStatsRespoonse } from "../../../../shared/types";

type Bill = BillsStatsRespoonse["bills"][number];

function BillsPage() {
	const [type, setType] = useState<"Add" | "Edit">("Add");
	const [bill, setBill] = useState<Bill | null>(null);

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data } = useGetBillsStats();
	if (!data) return null;
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
			<BillsStats
				dueThisWeek={summary.upcomingWeeklyBills}
				dueThisMonth={summary.monthlyBills}
				overdue={summary.overdueBills}
			/>
			<BillsTable bills={bills} setBill={setBill} setIsFormOpen={setIsFormOpen} setType={setType} />
			<BillsForm
				type={type}
				bill={bill}
				setIsOpen={setIsFormOpen}
				isOpen={isFormOpen}
			/>
		</div>
	);
}

export default BillsPage;
