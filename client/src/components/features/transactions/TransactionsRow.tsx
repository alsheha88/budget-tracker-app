import { capitalizeFirstLetter, formatDateShort, formatKWD } from "../../../lib/utils";
import { getCategoryIcon } from "../../../lib/icons";
import Badge from "../../ui/Badge";
import type { TransactionsResponse } from "../../../../../shared/types";
import { Button } from "../../ui/Button";
import { Edit, Trash2, ArrowLeftRight } from "lucide-react";
import { useState, type SetStateAction } from "react";
import { useDeleteTransaction } from "../../../hooks/transactions/transactions";
import Modal from "../../ui/Modal";

type Transaction = TransactionsResponse["transactions"][number];

type TransactionsRowProps = {
	setTransaction: (transaction: Transaction | null) => void;
	transaction: Transaction;
	setMode: React.Dispatch<SetStateAction<"Add" | "Edit">>;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const TRANSFER_COLOR = "#10B981";

function TransactionsRow({
	transaction,
	setIsOpen,
	setMode,
	setTransaction,
}: TransactionsRowProps) {
	const isTransfer = transaction.type === "Transfer";
	const [isModalOpen, setIsModalOpen] = useState(false);
	const Icon = getCategoryIcon(transaction.category?.name ?? "");
	const { mutate: deleteTransaction } = useDeleteTransaction();

	const iconColor = isTransfer
		? TRANSFER_COLOR
		: transaction.category?.color ?? "#10B981";

	return (
		<div
			role="row"
			className="
				flex flex-col gap-3 p-4 rounded-md border border-border-default
				lg:grid lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] lg:items-center
				lg:gap-0 lg:p-0 lg:py-3.5 lg:px-4 lg:rounded-none lg:border-none
			">
			{/* Icon + merchant — the row's identity, always shown, no label */}
			<div className="flex items-center gap-3 lg:order-2">
				<div
					className="w-10 h-10 flex items-center justify-center rounded-sm shrink-0"
					style={{ backgroundColor: `${iconColor}26` }}>
					{isTransfer ? (
						<ArrowLeftRight color={TRANSFER_COLOR} size={16} />
					) : (
						<Icon color={iconColor} size={16} />
					)}
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-button-md text-text-primary">
						{transaction.merchant}
					</p>
					<p className="text-caption-md text-sidebar-foreground">
						{transaction.description}
					</p>
				</div>
			</div>

			{/* Date */}
			<div className="flex items-center justify-between lg:block lg:order-1">
				<span className="text-label-md text-input-placeholder lg:hidden">
					Date
				</span>
				<p className="text-caption-lg text-sidebar-foreground">
					{formatDateShort(transaction.date.toString())}
				</p>
			</div>

			{/* Category / Transfer */}
			<div className="flex items-center justify-between lg:block lg:order-3">
				<span className="text-label-md text-input-placeholder lg:hidden">
					Category
				</span>
				{isTransfer ? (
					<Badge name="Transfer" color={TRANSFER_COLOR} />
				) : (
					<Badge
						name={capitalizeFirstLetter(transaction.category?.name ?? "")}
						color={transaction.category?.color ?? "#6b7280"}
					/>
				)}
			</div>

			{/* Account */}
			<div className="flex items-center justify-between lg:block lg:order-4">
				<span className="text-label-md text-input-placeholder lg:hidden">
					Account
				</span>
				<p className="text-caption-lg text-sidebar-foreground">
					{transaction.account.name}
				</p>
			</div>

			{/* Amount */}
			<div className="flex items-center justify-between lg:block lg:order-5">
				<span className="text-label-md text-input-placeholder lg:hidden">
					Amount
				</span>
				<p className="text-button-md text-text-primary">
					{formatKWD(Number(transaction.amount))}
				</p>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-2 justify-end lg:justify-start lg:order-6">
				<Button
					variant="ghost"
					className="hover:bg-transparent"
					onClick={() => {
						setTransaction(transaction);
						setIsOpen(true);
						setMode("Edit");
					}}>
					<Edit
						size={16}
						className="text-sidebar-foreground hover:text-accent-foreground"
					/>
				</Button>
				<Button
					variant="ghost"
					className="hover:bg-transparent"
					onClick={() => setIsModalOpen(true)}>
					<Trash2
						size={16}
						className="text-sidebar-foreground hover:text-interactive-destructive-active"
					/>
				</Button>
			</div>

			<Modal
				title={"Delete Transaction"}
				content={`Are you sure you want to delete ${transaction.merchant}? this action cannot be undone`}
				btnContent={"Delete"}
				type={"delete"}
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				onDelete={() =>
					deleteTransaction(transaction.id, {
						onSuccess: () => setIsModalOpen(false),
					})
				}
			/>
		</div>
	);
}

export default TransactionsRow;