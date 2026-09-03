import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useCreateTransfer } from "../../../hooks/transactions/transactions";
import Input from "../../ui/Input";
import {
	transferTransactionSchema,
	type TransferTransactionData,
} from "../../../schemas/transactionsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectComponent from "../../ui/Select";
import PopoverComponent from "../../ui/Popover";
import DatePicker from "../../ui/DatePicker";
import { useGetAccountStats } from "../../../hooks/accounts/useAccounts";
import { capitalizeFirstLetter, formatDateShort } from "../../../lib/utils";
import { useState, type SetStateAction } from "react";
import { Button } from "../../ui/Button";

type TransferFormProps = {
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

function TransferForm({ setIsOpen }: TransferFormProps) {
	const [datePickerOpen, setDatePickerOpen] = useState(false);
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
		<form
			className="grid gap-5"
			onSubmit={handleSubmit(onSubmit, (errors) =>
				console.log("VALIDATION FAILED:", errors),
			)}>
			<Controller
				name="accounts.fromAccount"
				control={control}
				render={({ field }) => (
					<SelectComponent
						label={"From Wallet"}
						value={field.value!}
						onValueChange={field.onChange}
						options={accountsOptions}
						placeholder={"Select Account"}
						error={errors.accounts?.fromAccount?.message}
					/>
				)}
			/>
			<Controller
				name="accounts.toAccount"
				control={control}
				render={({ field }) => (
					<SelectComponent
						label={"To Wallet"}
						value={field.value!}
						onValueChange={field.onChange}
						options={accountsOptions}
						placeholder={"Select Account"}
						error={errors.accounts?.toAccount?.message}
					/>
				)}
			/>
			<Input
				type="number"
				label="Amount"
				id="amount"
				error={errors.amount?.message}
				{...register("amount", { valueAsNumber: true })}
			/>

			<div className="grid gap-1.5">
				<label className="text-sidebar-foreground text-caption-lg">
					Transfer Date
				</label>
				<Controller
					name="date"
					control={control}
					render={({ field }) => {
						return (
							<PopoverComponent
								open={datePickerOpen}
								onOpenChange={setDatePickerOpen}
								triggerContent={
									field.value
										? formatDateShort(field.value.toLocaleString())
										: "Select Date"
								}>
								<DatePicker
									selected={field.value!}
									setSelected={(date) => {
										field.onChange(date);
										setDatePickerOpen(false);
									}}
								/>
							</PopoverComponent>
						);
					}}
				/>
			</div>

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
