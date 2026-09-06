import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { capitalizeFirstLetter } from "../../../lib/utils";
import Input from "../../ui/Input";
import { BookOpenIcon } from "lucide-react";
import { useCreateBill, useEditBill } from "../../../hooks/bills/bills";
import { useGetCategories } from "../../../hooks/categories/useCategories";
import { useEffect, type SetStateAction } from "react";
import {
	createBillSchema,
	type CreateBillData,
} from "../../../schemas/billsSchema";
import type { BillsStatsRespoonse } from "../../../../../shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAccountStats } from "../../../hooks/accounts/useAccounts";
import FormSelect from "../formControllers/FormSelect";
import FormDatePicker from "../formControllers/FormDatePicker";

type Bill = BillsStatsRespoonse["bills"][number];
type BillsFormProps = {
	type: "Add" | "Edit";
	bill: Bill | null;
	setIsFormOpen: React.Dispatch<SetStateAction<boolean>>;
	isFormOpen: boolean;

};

function BillsForm({ bill, type, setIsFormOpen, isFormOpen }: BillsFormProps) {
	const header = type === "Add" ? "Add Bill" : "Edit Bill";
	const { mutate: addBill } = useCreateBill();
	const { mutate: editBill } = useEditBill();
	const { data } = useGetAccountStats();
	const { data: categories } = useGetCategories();
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateBillData>({
		resolver: zodResolver(createBillSchema),
		defaultValues: {
			name: bill?.name ?? "",
			amount: Number(bill?.amount) ?? 0,
			frequency: bill?.frequency ?? "monthly",
			dueDate: bill?.dueDate ?? new Date(),
			accountId: bill?.accountId ?? "",
			categoryId: bill?.categoryId ?? "",
			notes: bill?.notes ?? "",
			provider: bill?.provider ?? "",
		},
	});
	useEffect(() => {
		reset({
			name: bill?.name ?? "",
			amount: Number(bill?.amount) ?? 0,
			frequency: bill?.frequency ?? "monthly",
			dueDate: bill?.dueDate ?? new Date(),
			accountId: bill?.accountId ?? "",
			categoryId: bill?.categoryId ?? "",
			notes: bill?.notes ?? "",
			provider: bill?.provider ?? "",
		});
	}, [bill, reset]);
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
	const frequencyOptions = [
		{ label: "Weekly", value: "weekly" },
		{ label: "Monthly", value: "monthly" },
		{ label: "Yearly", value: "yearly" },
	];

	const onSubmit: SubmitHandler<CreateBillData> = (data) => {
		if (type === "Add") {
			addBill(data, {
				onSuccess: () => {
					setIsFormOpen(false);
				},
			});
		} else {
			editBill(
				{ id: bill!.id, data },
				{
					onSuccess: () => {
						setIsFormOpen(false);
					},
				},
			);
		}
	};

	return (
		isFormOpen && (
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
							label="Bill Name"
							id="billName"
							error={errors.name?.message}
							{...register("name")}
						/>
						<Input
							type={"text"}
							label="Provider / Merchant"
							id="provider"
							error={errors.name?.message}
							{...register("provider")}
						/>
						<Input
							type="number"
							label="Amount"
							id="amount"
							error={errors.amount?.message}
							{...register("amount", { valueAsNumber: true })}
						/>
						<FormSelect label="Category" placeholder="Select Category" name="categoryId" options={categoryOptions} control={control} />
						<FormSelect label="Billing Frequency" placeholder="Monthly" name="frequency" options={frequencyOptions} control={control} />
						<FormSelect label="Payment Account" placeholder="Select Account" name="accountId" options={accountsOptions} control={control} />
						<FormDatePicker name="dueDate" control={control} label="Next Due Date" />
						<div className="flex items-center gap-4 place-self-end">
							<Button variant="primary" size="lg" type="submit">
								{type === "Add" ? "Create" : "Save"}
							</Button>
							<Button
								variant="secondary"
								size="lg"
								type="button"
								onClick={() => setIsFormOpen(false)}>
								Cancel
							</Button>
						</div>
					</form>
				</Card>
			</div>
		)
	);
}

export default BillsForm;
