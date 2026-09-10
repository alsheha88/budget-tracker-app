import {
	Controller,
	type FieldValues,
	type FieldPath,
	type Control,
} from "react-hook-form";
import PopoverComponent from "../../ui/Popover";
import DatePicker from "../../ui/DatePicker";
import { useState } from "react";
import { formatDateShort } from "../../../lib/utils";

type FormDatePickerProps<T extends FieldValues> = {
	control: Control<T, any, T>;
	name: FieldPath<T>;
	label: string;
};

function FormDatePicker<T extends FieldValues>({
	control,
	name,
	label,
}: FormDatePickerProps<T>) {
	const [open, setOpen] = useState(false);
	return (
		<div className="grid gap-1.5">
			<label className="text-sidebar-foreground text-caption-lg">{label}</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<PopoverComponent
						open={open}
						onOpenChange={setOpen}
						triggerContent={
							field.value
								? formatDateShort(field.value.toLocaleString())
								: "Select Date"
						}>
						<DatePicker
							selected={field.value!}
							setSelected={(date) => {
								field.onChange(date);
								setOpen(false);
							}}
						/>
					</PopoverComponent>
				)}
			/>
		</div>
	);
}

export default FormDatePicker;
