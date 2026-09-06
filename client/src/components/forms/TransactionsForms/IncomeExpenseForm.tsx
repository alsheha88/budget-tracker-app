import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../ui/Button";
import { capitalizeFirstLetter } from "../../../lib/utils";
import Input from "../../ui/Input";
import * as Switch from "radix-ui/switch";
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
import FormDatePicker from "../formControllers/FormDatePicker";

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
	const { mutate: addTransaction } = useCreateTransaction();
	const { mutate: editTransaction } = useEditTransaction();
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
			isRecurring: transaction?.isRecurring ?? false,
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
			isRecurring: transaction?.isRecurring ?? false,
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
		<form className="grid gap-5 " onSubmit={handleSubmit(onSubmit)}>
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
			<FormDatePicker name="date" control={control} label="Transaction Date" />
			<div className="flex flex-col gap-2">
				<label className="text-text-secondary text-body-sm">
					Recurring Bill
				</label>
				<Controller
					name="isRecurring"
					control={control}
					render={({ field }) => {
						return (
							<Switch.Root
								checked={field.value}
								onCheckedChange={field.onChange}
								className="w-11 h-6 bg-surface-dark rounded-full relative data-[state=checked]:bg-toggle-on">
								<Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform data-[state=checked]:translate-x-5" />
							</Switch.Root>
						);
					}}
				/>
			</div>

			<div className="flex items-center gap-4 place-self-end">
				<Button variant="primary" size="lg" type="submit">
					{mode === "Add" ? "Create" : "Save"}
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
