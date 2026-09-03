import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import PopoverComponent from "../../ui/Popover";
import DatePicker from "../../ui/DatePicker";
import { capitalizeFirstLetter, formatDateShort } from "../../../lib/utils";
import Input from "../../ui/Input";
import SelectComponent from "../../ui/Select";
import { BookOpenIcon } from "lucide-react";
import { useCreateBill, useEditBill } from "../../../hooks/bills/bills";
import { useGetCategories } from "../../../hooks/categories/useCategories";
import { useEffect, useState, type SetStateAction } from "react";
import {
	createBillSchema,
	type CreateBillData,
} from "../../../schemas/billsSchema";
import type { BillsStatsRespoonse } from "../../../../../shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "../../../lib/api";
import { useGetAccountStats } from "../../../hooks/accounts/useAccounts";

type Bill = BillsStatsRespoonse["bills"][number];
type BillsFormProps = {
	type: "Add" | "Edit";
	bill: Bill | null;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
};

function BillsForm({ bill, type, setIsOpen, isOpen }: BillsFormProps) {
	const [datePickerOpen, setDatePickerOpen] = useState(false);
	console.log(new Date());
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
					setIsOpen(false);
				},
				onError: (e) => {
					console.log(getApiErrorMessage(e));
				},
			});
		} else {
			editBill(
				{ id: bill!.id, data },
				{
					onSuccess: () => {
						setIsOpen(false);
					},
				},
			);
		}
	};

	return (
		isOpen && (
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
				<Card size="xl" className="grid w-full max-w-sm">
					<div className="flex items-center gap-3">
						<BookOpenIcon className="text-toggle-on" />
						<h3 className="text-h3">{header}</h3>
					</div>
					<hr className="mt-6 mb-6 text-border-default" />

					<form
						className="grid gap-5 "
						onSubmit={handleSubmit(onSubmit, (errors) =>
							console.log("VALIDATION FAILED:", errors),
						)}>
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

						<Controller
							name="categoryId"
							control={control}
							render={({ field }) => (
								<>
									<SelectComponent
										label={"Category"}
										value={field.value!}
										onValueChange={field.onChange}
										options={categoryOptions}
										placeholder={"Select Category"}
										error={errors.categoryId?.message}
									/>
								</>
							)}
						/>
						<Controller
							name="frequency"
							control={control}
							render={({ field }) => (
								<SelectComponent
									label={"Billing Frequency"}
									value={field.value}
									onValueChange={field.onChange}
									options={frequencyOptions}
									placeholder={"Monthly"}
									error={errors.frequency?.message}
								/>
							)}
						/>
						<Controller
							name="accountId"
							control={control}
							render={({ field }) => (
								<SelectComponent
									label={"Payment Account"}
									value={field.value!}
									onValueChange={field.onChange}
									options={accountsOptions}
									placeholder={"Select Account"}
									error={errors.accountId?.message}
								/>
							)}
						/>

						<div className="grid gap-1.5">
							<label className="text-sidebar-foreground text-caption-lg">
								Next Due Date
							</label>
							<Controller
								name="dueDate"
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

export default BillsForm;
