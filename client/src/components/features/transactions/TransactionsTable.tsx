import type { Dispatch, SetStateAction } from "react";
import type { Response } from "../../../api/transactions/transactions";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import TableHeader from "./TableHeader";
import TransactionsRow from "./TransactionsRow";
import { getPageNumbers } from "../../../lib/utils";

type TransactionsTableProps = {
	data: Response;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
};

function TransactionsTable({ data, page, setPage }: TransactionsTableProps) {
	const skip = (page - 1) * data.limit;

    const pages = getPageNumbers(page, data.totalPages)

	return (
		<Card size="xl" role="table" className="grid gap-4">
			<div>
				<TableHeader />
				<hr className="text-border-default" />

				{data.transactions.map((i) => (
					<div key={i.id}>
						<TransactionsRow
							date={i.date}
							name={i.merchant}
							description={i.description ?? ""}
							category={i.category?.name ?? ""}
							color={i.category?.color ?? ""}
							account={i.account.name}
							amount={Number(i.amount)}
						/>
						<hr className="text-border-default" />
					</div>
				))}
			</div>
			<div className="flex items-center justify-between">
				<p className="text-caption-lg text-input-placeholder">
					Showing {skip + 1} - {Math.min(skip + data.limit, data.count)} of{" "}
					{data.count} transactions
				</p>
				<div className="flex items-center gap-2">
					<Button
						variant="secondary"
						onClick={() => setPage(page - 1)}
						disabled={page === 1}>
						Prev
					</Button>
					{pages.map((p) => (
						p === "..." ? <span className="text-input-placeholder" key={p}>{p}</span> : <Button
							variant="secondary"
							onClick={() => setPage(p as number)}
							className={`${p === page && `border-accent-foreground bg-accent-default text-accent-foreground`} `}>
							{p}
						</Button>
					))}

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
