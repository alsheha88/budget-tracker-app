import { type SetStateAction } from "react";
import type { Response } from "../../../api/transactions/transactions";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import TableHeader from "../../ui/TableHeader";
import TransactionsRow from "./TransactionsRow";
import { getPageNumbers } from "../../../lib/utils";
import type { TransactionsResponse } from "../../../../../shared/types";

type Transaction = TransactionsResponse["transactions"][number];

type TransactionsTableProps = {
	data: Response;
	page: number;
	setPage: React.Dispatch<SetStateAction<number>>;
	setTransaction: (transaction: Transaction | null) => void;
	setMode: React.Dispatch<SetStateAction<"Add" | "Edit">>;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

function TransactionsTable({
	data,
	page,
	setPage,
	setTransaction,
	setIsOpen,
	setMode,
}: TransactionsTableProps) {
	const skip = (page - 1) * data.limit;
	const pages = getPageNumbers(page, data.totalPages);
	const tableHeaders = [
		"DATE",
		"MERCHANT / DESCRIPTION",
		"CATEGORY",
		"ACCOUNT",
		"AMOUNT",
	];

	return (
		<Card size="xl" role="table" className="grid gap-4">
			<div>
				<TableHeader
					headers={tableHeaders}
					gridCol={"0.5fr_2fr_1fr_1fr_1fr_0.5fr"}
				/>
				<hr className="text-border-default hidden lg:block" />
				<h3 className="text-h3 text-text-primary mb-4 block lg:hidden">
					Transactions
				</h3>

				{data.transactions.map((i) => (
					<div key={i.id} className="mb-3 lg:mb-0">
						<TransactionsRow
							setTransaction={setTransaction}
							transaction={i}
							setIsOpen={setIsOpen}
							setMode={setMode}
						/>
						<hr className="text-border-default hidden lg:block" />
					</div>
				))}
			</div>
			<div className="flex flex-col sm:flex-row items-center justify-between gap-3">
				<p className="text-caption-lg text-input-placeholder">
					Showing {skip + 1} - {Math.min(skip + data.limit, data.count)} of{" "}
					{data.count} transactions
				</p>
				<div className="flex items-center gap-2 flex-wrap justify-center">
					<Button
						variant="secondary"
						onClick={() => setPage(page - 1)}
						disabled={page === 1}>
						Prev
					</Button>
					{pages.map((p) =>
						p === "..." ? (
							<span className="text-input-placeholder" key={p}>
								{p}
							</span>
						) : (
							<Button
								key={p}
								variant="secondary"
								onClick={() => setPage(p as number)}
								className={`${p === page && `border-accent-foreground bg-accent-default text-accent-foreground`} `}>
								{p}
							</Button>
						),
					)}

					<Button
						variant="secondary"
						onClick={() => setPage(page + 1)}
						disabled={page === data.totalPages}>
						Next
					</Button>
				</div>
			</div>
		</Card>
	);
}

export default TransactionsTable;