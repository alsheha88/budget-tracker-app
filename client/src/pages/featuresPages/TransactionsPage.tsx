// React hooks imports
import { useEffect, useState } from "react";
// Components imports
import TransactionsStats from "../../components/features/dashboard/TransactionsStats";
import TransactionsTable from "../../components/features/transactions/TransactionsTable";
import TransactionsForm from "../../components/forms/TransactionsForms/TransactionsForm";
import LoadingState from "../../components/state/LoadingState";
import Input from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import ErrorState from "../../components/state/ErrorState";
import EmptyState from "../../components/state/EmptyState";
// Icons imports
import { ListTodo, Search } from "lucide-react";
// Custom hooks imports
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { useTransactions } from "../../hooks/transactions/transactions";
// Types imports
import type { TransactionsResponse } from "../../../../shared/types";

type Transaction = TransactionsResponse["transactions"][number];

function TransactionsPage() {
	const [page, setPage] = useState(1);
	const [searchInput, setSearchInput] = useState("");
	const [search, setSearch] = useState("");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [transaction, setTransaction] = useState<Transaction | null>(null);
	const [type, setType] = useState<"Add" | "Edit">("Add");
	const { data, isError: statsError, isPending: statsPending } = useDashboard();
	const {
		data: transactions,
		isError,
		isPending,
		refetch,
	} = useTransactions(page, search);
	useEffect(() => {
		const timer = setTimeout(() => {
			setSearch(searchInput);
			setPage(1);
		}, 300);
		return () => clearTimeout(timer);
	}, [searchInput]);
	if (isPending || statsPending) return <LoadingState />;
	if (isError || statsError)
		return (
			<>
				<ErrorState
					title="Something Went Wrong"
					message="We couldn't load your transactions"
					onAction={refetch}
				/>
			</>
		);
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
							setTransaction(null);
						}}>
						Add Transaction
					</Button>
				</div>
			</div>
			{transactions.count === 0 ? (
				search ? (
					<EmptyState
						icon={<Search />}
						title="No results"
						message={`No transactions match "${search}"`}
					/>
				) : (
					<EmptyState
						icon={<ListTodo />}
						title="No transactions added"
						message=""
						btnText="Add Transaction"
						onAction={() => {
							setIsFormOpen(true);
							setType("Add");
						}}
					/>
				)
			) : (
				<>
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
						setIsOpen={setIsFormOpen}
						setMode={setType}
					/>
				</>
			)}
			<TransactionsForm
				setIsOpen={setIsFormOpen}
				isOpen={isFormOpen}
				mode={type}
				transaction={transaction}
			/>
		</div>
	);
}

export default TransactionsPage;
