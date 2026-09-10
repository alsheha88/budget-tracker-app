import { type SetStateAction } from "react";
import type { BillsStatsRespoonse } from "../../../../../shared/types";
import { useGetCategories } from "../../../hooks/categories/useCategories";
import { Card } from "../../ui/Card";
import TableHeader from "../../ui/TableHeader";
import BillRow from "./BillsRow";

type Bills = BillsStatsRespoonse["bills"];
type Bill = BillsStatsRespoonse["bills"][number];

type BillsTableProps = {
	bills: Bills;
	setIsFormOpen: React.Dispatch<SetStateAction<boolean>>;
	setType: React.Dispatch<SetStateAction<"Add" | "Edit">>;
	setBill: (bill: Bill | null) => void;
};

function BillsTable({
	bills,
	setIsFormOpen,
	setType,
	setBill,
}: BillsTableProps) {
	const { data: categories } = useGetCategories();

	const tableHeaders = [
		"Provider / Bill Name",
		"Amount",
		"Frequency",
		"Next Due Date",
		"Status",
	];

	return (
		<Card size="xl" role="table" className="grid gap-4">
			<div className="">
				<TableHeader
					headers={tableHeaders}
					gridCol={"2fr_1fr_1fr_1fr_1fr_1fr"}
				/>
				<hr className="text-border-default lg:block hidden" />
				<h3 className="text-h3 text-text-primary mb-4 block lg:hidden">
					Bills
				</h3>

				{bills?.map((i) => {
					const category = categories?.find((c) => c.id === i.categoryId);
					const status = i.paidAt ? "paid" : "upcoming";

					return (
						<div key={i.id} className="mb-3">
							<BillRow
								category={category?.name ?? ""}
								color={category?.color ?? ""}
								status={status}
								setIsFormOpen={setIsFormOpen}
								setType={setType}
								setBill={setBill}
								bill={i}
							/>
							<hr className="text-border-default lg:block hidden" />
						</div>
					);
				})}
			</div>
		</Card>
	);
}

export default BillsTable;
