import { useEffect, useState, type SetStateAction } from "react";
import TransactionsStats from "../../components/features/dashboard/TransactionsStats";
import TransactionsTable from "../../components/features/transactions/TransactionsTable";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { useTransactions } from "../../hooks/transactions/transactions";
import Input from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import type { TransactionsResponse } from "../../../../shared/types";
import TransactionsForm from "../../components/forms/TransactionsForms/TransactionsForm";

type Transaction = TransactionsResponse["transactions"][number];

function TransactionsPage() {
	const [page, setPage] = useState(1);
	const [searchInput, setSearchInput] = useState("");
	const [search, setSearch] = useState("");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [transaction, setTransaction] = useState<Transaction | null>(null);
	const [type, setType] = useState<"Add" | "Edit">("Add");
	const { data } = useDashboard();
	const { data: transactions } = useTransactions(page, search);
	useEffect(() => {
		const timer = setTimeout(() => {
			setSearch(searchInput);
			setPage(1);
		}, 300);
		return () => clearTimeout(timer);
	}, [searchInput]);
	if (!data) return null;
	if (!transactions) return null;
	const { transactionsStats } = data;

	return (
		<div className="grid gap-6">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-1">
					<h2 className="text-h2 text-text-primary">Transactions</h2>
					<p className="text-caption-lg text-text-secondary">
						Track and manage all your transactional cash flow and history.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Input
						type={"text"}
						placeholder="Search by merchant, card..."
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<Button
						size="lg"
						type="button"
						onClick={() => {
							setIsFormOpen(true);
							setType("Add");
						}}>
						Add Transaction
					</Button>
				</div>
			</div>
			<TransactionsStats
				income={transactionsStats.income}
				expenses={transactionsStats.expenses}
				balance={transactionsStats.balance}
			/>
			<TransactionsTable
				data={transactions}
				page={page}
				setPage={setPage}
				setTransaction={setTransaction}
				transaction={transaction!}
			/>
			<TransactionsForm setIsOpen={setIsFormOpen } isOpen={isFormOpen} mode={type} />
		</div>
	);
}

export default TransactionsPage;
