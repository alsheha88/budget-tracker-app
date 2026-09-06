import { useEffect, type Dispatch, type SetStateAction } from "react";
import {  useForm, type SubmitHandler } from "react-hook-form";
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
import { Button } from "../../ui/Button";
import FormSelect from "../formControllers/FormSelect";
import FormDatePicker from "../formControllers/FormDatePicker";

type SavingsItem = SavingsResponse["savings"][number];
type SavingsFormData = {
	type: "Add" | "Edit";
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	savings: SavingsItem;
};

function SavingsForm({ savings, type, isOpen, setIsOpen }: SavingsFormData) {
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

					<form className="grid gap-5 " onSubmit={handleSubmit(onSubmit)}>
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
						<FormDatePicker name="targetDate" control={control} label="Select Date" />
						<FormSelect
							label="Priority"
							placeholder="Select Priority"
							name="priority"
							options={options}
							control={control}
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

export default SavingsForm;
