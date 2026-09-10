import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../ui/Button";
import { capitalizeFirstLetter } from "../../../lib/utils";
import Input from "../../ui/Input";
import { useGetCategories } from "../../../hooks/categories/useCategories";
import { useEffect, type SetStateAction } from "react";
import type { TransactionsResponse } from "../../../../../shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAccountStats } from "../../../hooks/accounts/useAccounts";
import {
	useCreateTransaction,
	useEditTransaction,
} from "../../../hooks/transactions/transactions";
import {
	createTransactionSchema,
	type CreateTransactionData,
} from "../../../schemas/transactionsSchema";
import FormSelect from "../formControllers/FormSelect";
import { ThreeDots } from "react-loader-spinner";

type Transaction = TransactionsResponse["transactions"][number];
type TransactionsFormProps = {
	mode: "Add" | "Edit";
	transaction: Transaction | null;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	transactionType: "Income" | "Expense";
};

function IncomeExpenseForm({
	transaction,
	mode,
	setIsOpen,
	transactionType,
}: TransactionsFormProps) {
	const { mutate: addTransaction, isPending: pendingCreate } =
		useCreateTransaction();
	const { mutate: editTransaction, isPending: pendingEdit } =
		useEditTransaction();
	const { data } = useGetAccountStats();
	const { data: categories } = useGetCategories();
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateTransactionData>({
		resolver: zodResolver(createTransactionSchema),
		defaultValues: {
			merchant: transaction?.merchant ?? "",
			amount: Number(transaction?.amount) ?? 0,
			type: transactionType,
			date: transaction?.date ?? new Date(),
			accountId: transaction?.accountId ?? "",
			categoryId: transaction?.categoryId ?? "",
			notes: transaction?.notes ?? "",
			description: transaction?.description ?? "",
			billId: transaction?.billId ?? undefined,
			isRecurring: false,
		},
	});
	useEffect(() => {
		reset({
			merchant: transaction?.merchant ?? "",
			amount: Number(transaction?.amount) ?? 0,
			type: transactionType,
			date: transaction?.date ?? new Date(),
			accountId: transaction?.accountId ?? "",
			categoryId: transaction?.categoryId ?? "",
			notes: transaction?.notes ?? "",
			description: transaction?.description ?? "",
			billId: transaction?.billId ?? undefined,
			isRecurring: false,
		});
	}, [transaction, reset]);
	if (!categories) return null;
	if (!data) return null;
	const accountsOptions = data.accounts.map((i) => {
		return {
			label: capitalizeFirstLetter(i.name),
			value: i.id,
		};
	});
	const categoryOptions = categories.map((i) => {
		return {
			label: capitalizeFirstLetter(i.name),
			value: i.id,
		};
	});

	const onSubmit: SubmitHandler<CreateTransactionData> = (data) => {
		if (mode === "Add") {
			addTransaction(data, {
				onSuccess: () => {
					setIsOpen(false);
				},
			});
		} else {
			editTransaction(
				{ id: transaction!.id, data },
				{
					onSuccess: () => {
						setIsOpen(false);
					},
				},
			);
		}
	};

	return (
		<form
			className="grid gap-5 "
			onSubmit={handleSubmit(onSubmit, (errors) =>
				console.log("VALIDATION FAILED:", errors),
			)}>
			<Input
				type={"text"}
				label="Merchant"
				id="merchant"
				error={errors.merchant?.message}
				{...register("merchant")}
			/>
			<Input
				type="number"
				label="Amount"
				id="amount"
				error={errors.amount?.message}
				{...register("amount", { valueAsNumber: true })}
			/>
			<FormSelect
				label="Category"
				placeholder="Select Category"
				name="categoryId"
				options={categoryOptions}
				control={control}
			/>
			<FormSelect
				label="Payment Account"
				placeholder="Select Account"
				name="accountId"
				options={accountsOptions}
				control={control}
			/>

			<div className="flex items-center gap-4 place-self-end">
				<Button
					variant="primary"
					size="lg"
					type="submit"
					disabled={pendingCreate || pendingCreate}>
					{pendingCreate || pendingEdit ? (
						<ThreeDots color="#09090b" width={16} height={16} />
					) : mode === "Add" ? (
						"Create"
					) : (
						"Save"
					)}
				</Button>
				<Button
					variant="secondary"
					size="lg"
					type="button"
					onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
			</div>
		</form>
	);
}

export default IncomeExpenseForm;
