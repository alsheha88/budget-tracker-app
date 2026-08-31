import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
	useCreateSavings,
	useEditSavings,
} from "../../../hooks/savings/savings";
import { Card } from "../../ui/Card";
import { BookOpenIcon } from "lucide-react";
import type { SavingsResponse } from "../../../../../shared/types";
import Input from "../../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createSavingsSchema,
	type CreateSavingsData,
} from "../../../schemas/savingsSchema";
import SelectComponent from "../../ui/Select";
import { Button } from "../../ui/Button";
import DatePicker from "../../ui/DatePicker";
import PopoverComponent from "../../ui/Popover";
import { formatDateShort } from "../../../lib/utils";

type SavingsItem = SavingsResponse["savings"][number];
type SavingsFormData = {
	type: "Add" | "Edit";
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	savings: SavingsItem;
};

function SavingsForm({ savings, type, isOpen, setIsOpen }: SavingsFormData) {
	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const { mutate: addSavings } = useCreateSavings();
	const { mutate: editSavings } = useEditSavings();
	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<CreateSavingsData>({
		resolver: zodResolver(createSavingsSchema),
		defaultValues: {
			name: savings?.name ?? "",
			description: savings?.description ?? "",
			target: Number(savings?.target) ?? 0,
			priority: savings?.priority ?? "medium",
			monthlyContribution: Number(savings?.monthlyContribution) ?? 0,
			targetDate: savings?.targetDate ?? new Date(),
			color: savings?.color ?? "#10B981",
		},
	});
	useEffect(() => {
		reset({
			name: savings?.name ?? "",
			description: savings?.description ?? "",
			target: Number(savings?.target) ?? 0,
			priority: savings?.priority ?? "medium",
			monthlyContribution: Number(savings?.monthlyContribution) ?? 0,
			targetDate: savings?.targetDate
				? new Date(savings.targetDate)
				: new Date(),
			color: savings?.color ?? "#10B981",
		});
	}, [savings, reset]);

	const options = [
		{ label: "High", value: "high" },
		{ label: "Medium", value: "medium" },
		{ label: "Low", value: "low" },
	];

	const onSubmit: SubmitHandler<CreateSavingsData> = (data) => {
		if (type === "Add") {
			addSavings(data, {
				onSuccess: () => {
					setIsOpen(false);
				},
			});
		} else {
			editSavings(
				{ id: savings.id, data },
				{
					onSuccess: () => {
						setIsOpen(false);
					},
				},
			);
		}
	};

	const header = type === "Add" ? "Add Savings" : "Edit Savings";

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
							label="Goal Name"
							id="goalName"
							error={errors.name?.message}
							{...register("name")}
						/>
						<Input
							type="number"
							label="Monthly Contribution"
							id="monthlyContribution"
							error={errors.monthlyContribution?.message}
							{...register("monthlyContribution", { valueAsNumber: true })}
						/>
						<Input
							type="number"
							label="Target Amount"
							id="targetAmount"
							error={errors.target?.message}
							{...register("target", { valueAsNumber: true })}
						/>
						<div className="grid gap-1.5">
							<label className="text-sidebar-foreground text-caption-lg">
								Select Date
							</label>
							<Controller
								name="targetDate"
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
							name="priority"
							control={control}
							render={({ field }) => (
								<SelectComponent
									label={"Priority"}
									value={field.value}
									onValueChange={field.onChange}
									options={options}
									placeholder={"Select Priority"}
									error={errors.priority?.message}
								/>
							)}
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
								Cancel{" "}
							</Button>
						</div>
					</form>
				</Card>
			</div>
		)
	);
}

export default SavingsForm;
