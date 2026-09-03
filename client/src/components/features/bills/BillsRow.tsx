import Badge from "../../ui/Badge";
import { getCategoryIcon } from "../../../lib/icons";
import { formatDateShort } from "../../../lib/utils";
import { capitalizeFirstLetter } from "../../../lib/helpers";
import { Button } from "../../ui/Button";
import { useMarkAsPaid } from "../../../hooks/bills/bills";
import Modal from "../../ui/Modal";
import { useState, type SetStateAction } from "react";
import type { BillsStatsRespoonse } from "../../../../../shared/types";

type Bill = BillsStatsRespoonse["bills"][number];

type ListProps = {
	category: string;
	color: string;
	status?: "paid" | "upcoming";
	bill: Bill;
	setIsFormOpen: React.Dispatch<SetStateAction<boolean>>;
	setType: React.Dispatch<SetStateAction<"Add" | "Edit">>;
	setBill: (bill: Bill | null) => void;
};

function BillRow({
	category,
	color,
	status,
	setIsFormOpen,
	setType,
	setBill,
	bill,
}: ListProps) {
	const Icon = getCategoryIcon(category);
	const [isOpen, setIsOpen] = useState(false);
	const { mutate: markAsPaid } = useMarkAsPaid();
	const periodColors = {
		weekly: "#ef4343",
		monthly: "#e7b008",
		yearly: "#21c45d",
	};
	const statusColors = {
		paid: "#21c45d",
		upcoming: "#e7b008",
	};

	return (
		<div
			className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center justify-between py-3.5 px-4"
			role="row">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 flex items-center justify-center rounded-sm bg-surface-active">
					<Icon color={color || "hsla(160, 84%, 39%, 1)"} size={18} />
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-button-md text-text-primary">{}</p>
					<p className="text-caption-md text-sidebar-foreground">
						{bill.provider}
					</p>
				</div>
			</div>
			<p className="text-button-md text-text-primary">
				{Number(bill.amount)} KWD
			</p>
			<Badge
				name={capitalizeFirstLetter(bill.frequency)}
				color={periodColors[bill.frequency]}
			/>
			<p className="text-caption-lg text-sidebar-foreground">
				{formatDateShort(bill.dueDate.toString())}
			</p>
			{status && (
				<Badge
					name={capitalizeFirstLetter(status)}
					color={statusColors[status]}
				/>
			)}
			<div className="flex items-center gap-1">
				<Button
					size="sm"
					onClick={() => setIsOpen(true)}
					disabled={status === "paid"}>
					Mark As Paid
				</Button>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => {
						setType("Edit");
						setIsFormOpen(true);
						setBill(bill);
					}}>
					Edit
				</Button>
			</div>
			<Modal
				title={"Bill Paid?"}
				content={`You are about to set ${bill.name} as paid`}
				btnContent={"Mark as paid"}
				type={"other"}
				open={isOpen}
				onOpenChange={setIsOpen}
				onAction={() =>
					markAsPaid(
						{ id: bill.id, data: { paidAt: new Date() } },
						{ onSuccess: () => setIsOpen(false) },
					)
				}
			/>
		</div>
	);
}

export default BillRow;
