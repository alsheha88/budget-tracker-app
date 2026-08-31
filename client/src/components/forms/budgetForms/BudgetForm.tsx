import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import SelectComponent from "../../ui/Select";
import PopoverComponent from "../../ui/Popover";
import DatePicker from "../../ui/DatePicker";
import Input from "../../ui/Input";
import { BookOpenIcon } from "lucide-react";
import { useEffect, useState, type SetStateAction } from "react";
import type { BudgetsStatsResponse } from "../../../../../shared/types";
import {
	createBudgetSchema,
	type CreateBudgetData,
} from "../../../schemas/BudgetsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategories } from "../../../hooks/categories/useCategories";
import { capitalizeFirstLetter, formatDateShort } from "../../../lib/utils";
import {
	useCreateBudget,
	useEditBudget,
} from "../../../hooks/budgets/useBudgets";
import CheckboxComponent from "../../ui/Checkbox";
import SliderComponent from "../../ui/Slider";
import { getApiErrorMessage } from "../../../lib/api";

type Budget = BudgetsStatsResponse["budgetStats"][number];
type BudgetFormProps = {
	type: "Add" | "Edit";
	isOpen: boolean;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	budget: Budget;
};

function BudgetForm({ type, isOpen, setIsOpen, budget }: BudgetFormProps) {
	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const header = type === "Add" ? "Add Budget" : "Edit Budget";
	const { mutate: addBudget } = useCreateBudget();
	const { mutate: editBudget } = useEditBudget();
	const { data: categories } = useGetCategories();
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateBudgetData>({
		resolver: zodResolver(createBudgetSchema),
		defaultValues: {
			name: budget?.name ?? "",
			limit: Number(budget?.limit) ?? 0,
			period: budget?.period ?? "monthly",
			startDate: budget?.startDate ?? new Date(),
			alertThreshold: budget?.alertThreshold ?? 75,
			categoryId: budget?.categoryId ?? "",
			notes: budget?.notes ?? "",
			rollover: budget?.rollover ?? false,
		},
	});
	useEffect(() => {
		reset({
			name: budget?.name ?? "",
			limit: Number(budget?.limit) ?? 0,
			period: budget?.period ?? "monthly",
			startDate: budget?.startDate ? new Date(budget.startDate) : new Date(),
			alertThreshold: budget?.alertThreshold ?? 75,
			categoryId: budget?.categoryId ?? "",
			notes: budget?.notes ?? "",
			rollover: budget?.rollover ?? false,
		});
	}, [budget, reset]);
	if (!categories) return null;
	const categoryOptions = categories.map((i) => {
		return {
			label: capitalizeFirstLetter(i.name),
			value: i.id,
		};
	});
	const periodOptions = [
		{ label: "Weekly", value: "weekly" },
		{ label: "Monthly", value: "monthly" },
		{ label: "Quarterly", value: "quarterly" },
		{ label: "Yearly", value: "yearly" },
	];

	const onSubmit: SubmitHandler<CreateBudgetData> = (data) => {
		if (type === "Add") {
			addBudget(data, {
				onSuccess: () => {
					setIsOpen(false);
				},
				onError: (e) => {
					console.log(getApiErrorMessage(e));
				},
			});
		} else {
			editBudget(
				{ id: budget.id, data },
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
							label="Budget Name"
							id="budgetName"
							error={errors.name?.message}
							{...register("name")}
						/>
						{type === "Add" && (
							<Controller
								name="categoryId"
								control={control}
								render={({ field }) => (
									<>
										<SelectComponent
											label={"Category"}
											value={field.value}
											onValueChange={field.onChange}
											options={categoryOptions}
											placeholder={"Select Category"}
											error={errors.categoryId?.message}
										/>
										<Controller
											name="period"
											control={control}
											render={({ field }) => (
												<SelectComponent
													label={"Period"}
													value={field.value}
													onValueChange={field.onChange}
													options={periodOptions}
													placeholder={"Select Period"}
													error={errors.period?.message}
												/>
											)}
										/>
									</>
								)}
							/>
						)}
						<Input
							type="number"
							label="Limit"
							id="limit"
							error={errors.limit?.message}
							{...register("limit", { valueAsNumber: true })}
						/>
						<div className="grid gap-1.5">
							<label className="text-sidebar-foreground text-caption-lg">
								Start Date
							</label>
							<Controller
								name="startDate"
								control={control}
								render={({ field }) => {
									return (
										<PopoverComponent
											open={datePickerOpen}
											onOpenChange={setDatePickerOpen}
											triggerContent={
												field.value
													? formatDateShort(field.value.toLocaleDateString())
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

						<Controller
							name="alertThreshold"
							control={control}
							render={({ field }) => {
								return (
									<SliderComponent
										label={"Alert Threshold"}
										value={[field.value]}
										onValueChange={(val) => field.onChange(val[0])}
									/>
								);
							}}
						/>
						<Controller
							name="rollover"
							control={control}
							render={({ field }) => {
								return (
									<CheckboxComponent
										label={"Rollover"}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								);
							}}
						/>

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

export default BudgetForm;
