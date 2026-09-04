import type { SetStateAction } from "react";
import { Card } from "../../ui/Card";
import { BookOpenIcon } from "lucide-react";
import * as Tabs from "radix-ui/tabs";
import IncomeExpenseForm from "./IncomeExpenseForm";
import TransferForm from "./TransferForm";
import type { TransactionsResponse } from "../../../../../shared/types";

type Transaction = TransactionsResponse["transactions"][number];

type TransactionsFormProps = {
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	mode: "Add" | "Edit";
    transaction: Transaction | null;
};

function TransactionsForm({ isOpen, setIsOpen, mode, transaction }: TransactionsFormProps) {
	const header = mode === "Add" ? "Add Transaction" : "Edit Transaction";

	return (
		isOpen && (
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
				<Card size="xl" className="grid w-full max-w-sm">
					<div className="flex items-center gap-3">
						<BookOpenIcon className="text-toggle-on" />
						<h3 className="text-h3">{header}</h3>
					</div>
					<hr className="mt-6 mb-6 text-border-default" />

					<Tabs.Root defaultValue={transaction?.type ? transaction.type : "Expense"} className="grid gap-4">
						<Tabs.List className="grid grid-cols-3 gap-4 p-1 bg-surface-dark rounded-md">
							<Tabs.Trigger
								value="Expense"
								className="text-sidebar-foreground data-[state=active]:bg-priority-low data-[state=active]:text-toggle-on p-2 rounded-sm">
								Expense
							</Tabs.Trigger>
							<Tabs.Trigger
								value="Income"
								className="text-sidebar-foreground data-[state=active]:bg-priority-low data-[state=active]:text-toggle-on p-2 rounded-sm">
								Income
							</Tabs.Trigger>
							<Tabs.Trigger
								value="Transfer"
								className="text-sidebar-foreground data-[state=active]:bg-priority-low data-[state=active]:text-toggle-on p-2 rounded-sm">
								Transfer
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="Expense">
							<IncomeExpenseForm
								mode={mode}
								transaction={transaction}
								setIsOpen={setIsOpen}
								isOpen={isOpen}
								transactionType={"Expense"}
							/>
						</Tabs.Content>
						<Tabs.Content value="Income">
							<IncomeExpenseForm
								mode={mode}
								transaction={transaction}
								setIsOpen={setIsOpen}
								isOpen={isOpen}
								transactionType={"Income"}
							/>
						</Tabs.Content>
						<Tabs.Content value="Transfer">
							<TransferForm setIsOpen={setIsOpen} />
						</Tabs.Content>
					</Tabs.Root>
				</Card>
			</div>
		)
	);
}

export default TransactionsForm;
