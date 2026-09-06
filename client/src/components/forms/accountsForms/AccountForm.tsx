import { BookOpenIcon } from "lucide-react";
import {
	createAccountSchema,
	type CreateAccountData,
} from "../../../schemas/accountsSchema";
import { Card } from "../../ui/Card";
import Input from "../../ui/Input";
import { Button } from "../../ui/Button";
import {
	useCreateAccount,
	useEditAccount,
} from "../../../hooks/accounts/useAccounts";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { AccountStatsResponse } from "../../../../../shared/types";
import FormSelect from "../formControllers/FormSelect";

type AccountItem = AccountStatsResponse["accounts"][number];
type AccountFormData = {
	type: "Add" | "Edit";
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	account: AccountItem;
};

function AccountForm({ type, isOpen, setIsOpen, account }: AccountFormData) {
	const header = type === "Add" ? "Add Account" : "Edit Account";
	const { mutate: addAccount, isPending } = useCreateAccount();
	const { mutate: editAccount } = useEditAccount();
	const {
		handleSubmit,
		formState: { errors },
		register,
		control,
		reset,
	} = useForm<CreateAccountData>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			name: account?.name ?? "",
			accountType: account?.accountType ?? "checking",
			startingBalance: account ? Number(account.startingBalance) : 0,
		},
	});
	useEffect(() => {
		reset({
			name: account?.name ?? "",
			accountType: account?.accountType ?? "checking",
			startingBalance: account ? Number(account.startingBalance) : 0,
		});
	}, [account, reset]);

	const onSubmit: SubmitHandler<CreateAccountData> = (data) => {
		if (type === "Add") {
			addAccount(data, { onSuccess: () => setIsOpen(false) });
		} else {
			editAccount(
				{ id: account.id, data },
				{ onSuccess: () => setIsOpen(false) },
			);
		}
	};

	const options = [
		{ label: "Cash", value: "cash" },
		{ label: "Checking", value: "checking" },
		{ label: "Savings", value: "savings" },
		{ label: "Credit", value: "credit" },
		{ label: "Investment", value: "investment" },
		{ label: "Loan", value: "loan" },
	];

	return (
		isOpen && (
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
				<Card size="xl" className="grid w-full max-w-sm">
					<div className="flex items-center gap-3">
						<BookOpenIcon className="text-toggle-on" />
						<h3 className="text-h3">{header}</h3>
					</div>
					<hr className="mt-6 mb-6 text-border-default" />

					<form className="grid gap-5 " onSubmit={handleSubmit(onSubmit)}>
						<Input
							type={"text"}
							label="Account Name"
							id="accountName"
							error={errors.name?.message}
							{...register("name")}
						/>
						<FormSelect
							control={control}
							name="accountType"
							label="Account Type"
							placeholder="Select Type"
							options={options}
						/>

						{type === "Add" && (
							<Input
								type={"number"}
								label="Starting Balance"
								id="startingBalance"
								error={errors.startingBalance?.message}
								{...register("startingBalance", { valueAsNumber: true })}
							/>
						)}
						<div className="flex items-center gap-4 place-self-end">
							<Button
								variant="primary"
								size="lg"
								type="submit"
								disabled={isPending}>
								{type === "Add" ? "Create" : "Save"}
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
				</Card>
			</div>
		)
	);
}

export default AccountForm;
