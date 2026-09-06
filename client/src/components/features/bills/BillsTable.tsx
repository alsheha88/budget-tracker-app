import { useState, type SetStateAction } from "react";
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
	const [isModalOpen, setIsModalOpen] = useState(false);
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
			<div>
				<TableHeader
					headers={tableHeaders}
					gridCol={"2fr_1fr_1fr_1fr_1fr_1fr"}
				/>
				<hr className="text-border-default" />

				{bills?.map((i) => {
					const category = categories?.find((c) => c.id === i.categoryId);
					const status = i.paidAt ? "paid" : "upcoming";

					return (
						<div key={i.id}>
							<BillRow
								category={category?.name ?? ""}
								color={category?.color ?? ""}
								status={status}
								setIsFormOpen={setIsFormOpen}
								setType={setType}
								setBill={setBill}
								bill={i}
								setIsModalOpen={setIsModalOpen}
								isModalOpen={isModalOpen}
							/>
							<hr className="text-border-default" />
						</div>
					);
				})}
			</div>
		</Card>
	);
}

export default BillsTable;
