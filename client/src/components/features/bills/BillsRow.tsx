import Badge from "../../ui/Badge";
import { getCategoryIcon } from "../../../lib/icons";
import { formatDateShort, formatKWD } from "../../../lib/utils";
import { capitalizeFirstLetter } from "../../../lib/utils";
import { Button } from "../../ui/Button";
import { useDeleteBill, useMarkAsPaid } from "../../../hooks/bills/bills";
import Modal from "../../ui/Modal";
import { useState, type SetStateAction } from "react";
import type { BillsStatsRespoonse } from "../../../../../shared/types";
import { CheckCheckIcon, Edit, Trash2 } from "lucide-react";

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
	const [isPayOpen, setIsPayOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const Icon = getCategoryIcon(category);
	const { mutate: markAsPaid } = useMarkAsPaid();
	const { mutate: deleteBill } = useDeleteBill();
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
			role="row"
			className="
				flex flex-col gap-3 p-4 rounded-md border border-border-default
				lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] lg:items-center
				lg:gap-0 lg:p-0 lg:py-3.5 lg:px-4 lg:rounded-none lg:border-none
			">
			<div className="flex items-center gap-3">
				<div
					className="w-10 h-10 flex items-center justify-center rounded-sm shrink-0"
					style={{ backgroundColor: `${color || "#10B981"}26` }}>
					<Icon color={color || "#10B981"} size={18} />
				</div>
				<p className="text-button-md text-text-primary">
					{capitalizeFirstLetter(bill.provider)}
				</p>
			</div>

			{/* Amount */}
			<div className="flex items-center justify-between lg:block">
				<span className="text-label-md text-input-placeholder lg:hidden">
					Amount
				</span>
				<p className="text-button-md text-text-primary">
					{formatKWD(Number(bill.amount))}
				</p>
			</div>

			{/* Frequency */}
			<div className="flex items-center justify-between lg:block">
				<span className="text-label-md text-input-placeholder lg:hidden">
					Frequency
				</span>
				<Badge
					name={capitalizeFirstLetter(bill.frequency)}
					color={periodColors[bill.frequency]}
				/>
			</div>

			{/* Due date */}
			<div className="flex items-center justify-between lg:block">
				<span className="text-label-md text-input-placeholder lg:hidden">
					Next Due
				</span>
				<p className="text-caption-lg text-sidebar-foreground">
					{formatDateShort(bill.dueDate.toString())}
				</p>
			</div>

			{/* Status */}
			<div className="flex items-center justify-between lg:block">
				<span className="text-label-md text-input-placeholder lg:hidden">
					Status
				</span>
				{status && (
					<Badge
						name={capitalizeFirstLetter(status)}
						color={statusColors[status]}
					/>
				)}
			</div>

			{/* Actions */}
			<div className="flex items-center gap-1 justify-end lg:justify-start">
				<Button
					className="hover:bg-transparent"
					size="sm"
					variant="ghost"
					onClick={() => setIsPayOpen(true)}
					disabled={status === "paid"}>
					<CheckCheckIcon size={16} className="text-accent-foreground" />
				</Button>
				<Button
					className="hover:bg-transparent"
					size="sm"
					variant="ghost"
					onClick={() => {
						setType("Edit");
						setIsFormOpen(true);
						setBill(bill);
					}}>
					<Edit size={16} className="text-sidebar-foreground" />
				</Button>
				<Button
					size="sm"
					variant="ghost"
					onClick={() => setIsDeleteOpen(true)}
					className="hover:bg-transparent">
					<Trash2 size={16} className="text-sidebar-foreground" />
				</Button>
			</div>

			<Modal
				title={"Bill Paid?"}
				content={`You are about to set ${bill.name} as paid`}
				btnContent={"Mark as paid"}
				type={"other"}
				open={isPayOpen}
				onOpenChange={setIsPayOpen}
				onAction={() =>
					markAsPaid(
						{ id: bill.id, data: { paidAt: new Date() } },
						{ onSuccess: () => setIsPayOpen(false) },
					)
				}
			/>
			<Modal
				title={`Delete ${bill.name}`}
				content={`Are you sure you want to delete ${bill.name}? This action cannot be undone`}
				btnContent={"Delete"}
				type={"delete"}
				open={isDeleteOpen}
				onOpenChange={setIsDeleteOpen}
				onDelete={() =>
					deleteBill(bill.id, { onSuccess: () => setIsDeleteOpen(false) })
				}
			/>
		</div>
	);
}

export default BillRow;
