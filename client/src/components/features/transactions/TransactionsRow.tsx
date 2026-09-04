import { capitalizeFirstLetter, formatDateShort } from "../../../lib/utils";
import { getCategoryIcon } from "../../../lib/icons";
import Badge from "../../ui/Badge";
import type { TransactionsResponse } from "../../../../../shared/types";
import { Button } from "../../ui/Button";
import { Edit, Trash2 } from "lucide-react";
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

function TransactionsRow({
	transaction,
	setIsOpen,
	setMode,
	setTransaction,
}: TransactionsRowProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const Icon = getCategoryIcon(transaction.category?.name!);
	const { mutate: deleteTransaction } = useDeleteTransaction();

	return (
		<div
			className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] items-center justify-between py-3.5 px-4"
			role="row">
			<p className="text-caption-lg text-sidebar-foreground">
				{formatDateShort(transaction.date.toString())}
			</p>
			<div className="flex items-center gap-3">
				<div
					className="w-10 h-10 flex items-center justify-center rounded-sm"
					style={{
						backgroundColor: `${transaction.category?.color || "#10B981"}26`,
					}}>
					<Icon color={transaction.category?.color || "#10B981"} size={18} />
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
			<Badge
				name={capitalizeFirstLetter(transaction.category?.name!)}
				color={transaction.category?.color!}
			/>
			<p className="text-caption-lg text-sidebar-foreground">
				{transaction.account.name}
			</p>
			<p className="text-button-md text-text-primary">
				{Number(transaction.amount)} KWD
			</p>
			<div className="flex items-center gap-2">
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