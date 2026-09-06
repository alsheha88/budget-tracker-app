import { BookOpenIcon } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import Input from "../../ui/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	formContributionSchema,
	type FormContributionData,
} from "../../../schemas/transactionsSchema";
import { useCreateContribution } from "../../../hooks/savings/savings";
import type { SetStateAction } from "react";
import type { SavingsResponse } from "../../../../../shared/types";
import { useGetAccountStats } from "../../../hooks/accounts/useAccounts";
import FormSelect from "../formControllers/FormSelect";

type SavingsItem = SavingsResponse["savings"][number];
type ContributionFormData = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	savings: SavingsItem;
};

function ContributionForm({
	setIsOpen,
	isOpen,
	savings,
}: ContributionFormData) {
	const { mutate: addContribution } = useCreateContribution();
	const { data } = useGetAccountStats();
	const accounts = data?.accounts;
	const options = accounts?.map((i) => {
		return {
			label: i.name,
			value: i.id,
		};
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<FormContributionData>({
		resolver: zodResolver(formContributionSchema),
		defaultValues: {
			accountId: "",
			amount: 0,
		},
	});

	const onSubmit: SubmitHandler<FormContributionData> = (formData) => {
		addContribution(
			{
				...formData,
				savingsId: savings.id,
				date: new Date(),
				notes: null,
			},
			{ onSuccess: () => setIsOpen(false) }, // ← close on success
		);
	};
	return (
		isOpen && (
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
				<Card size="xl" className="grid w-full max-w-sm">
					<div className="flex items-center gap-3">
						<BookOpenIcon className="text-toggle-on" />
						<h3 className="text-h3">Add to {savings.name}</h3>
					</div>
					<hr className="mt-6 mb-6 text-border-default" />

					<form className="grid gap-5 " onSubmit={handleSubmit(onSubmit)}>
						<Input
							type={"number"}
							label="Amount"
							id="amount"
							error={errors.amount?.message}
							{...register("amount", { valueAsNumber: true })}
						/>

						<FormSelect label="Payment Account" placeholder="Select Account" name="accountId" options={options!} control={control} />

						<div className="flex items-center gap-4 place-self-end">
							<Button variant="primary" size="lg" type="submit">
								Contribute
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

export default ContributionForm;
