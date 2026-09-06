import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateTransfer } from "../../../hooks/transactions/transactions";
import Input from "../../ui/Input";
import {
	transferTransactionSchema,
	type TransferTransactionData,
} from "../../../schemas/transactionsSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetAccountStats } from "../../../hooks/accounts/useAccounts";
import { capitalizeFirstLetter } from "../../../lib/utils";
import { type SetStateAction } from "react";
import { Button } from "../../ui/Button";
import FormSelect from "../formControllers/FormSelect";
import FormDatePicker from "../formControllers/FormDatePicker";

type TransferFormProps = {
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

function TransferForm({ setIsOpen }: TransferFormProps) {
	const { mutate: transfer } = useCreateTransfer();
	const { data } = useGetAccountStats();
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
	} = useForm<TransferTransactionData>({
		resolver: zodResolver(transferTransactionSchema),
		defaultValues: {
			accounts: { fromAccount: "", toAccount: "" },
			amount: 0,
			date: new Date(),
			notes: "",
		},
	});
	if (!data) return null;
	const accounts = data.accounts;
	const accountsOptions = accounts.map((i) => {
		return {
			label: capitalizeFirstLetter(i.name),
			value: i.id,
		};
	});
	const onSubmit: SubmitHandler<TransferTransactionData> = (data) =>
		transfer(data, { onSuccess: () => setIsOpen(false) });
	return (
		<form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
			<FormSelect
				label="From Wallet"
				placeholder="Select Account"
				name="accounts.fromAccount"
				options={accountsOptions}
				control={control}
			/>
			<FormSelect
				label="To Wallet"
				placeholder="Select Account"
				name="accounts.toAccount"
				options={accountsOptions}
				control={control}
			/>
			<Input
				type="number"
				label="Amount"
				id="amount"
				error={errors.amount?.message}
				{...register("amount", { valueAsNumber: true })}
			/>
			<FormDatePicker control={control} name="date" label="Select Date" />

			<div className="flex items-center gap-4 place-self-end">
				<Button variant="primary" size="lg" type="submit">
					Transfer
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

export default TransferForm;
