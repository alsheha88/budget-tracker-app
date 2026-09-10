import {
	type FieldPath,
	type FieldValues,
	type Control,
	Controller,
} from "react-hook-form";
import SelectComponent from "../../ui/Select";

type FormSelectProps<T extends FieldValues> = {
	control: Control<T, any, any>;
	name: FieldPath<T>;
	label: string;
	options: { label: string; value: string }[];
	placeholder: string;
};

function FormSelect<T extends FieldValues>({
	control,
	name,
	placeholder,
	label,
	options,
}: FormSelectProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<SelectComponent
					label={label}
					options={options}
					placeholder={placeholder}
					value={field.value}
					onValueChange={field.onChange}
					error={fieldState.error?.message}
				/>
			)}
		/>
	);
}

export default FormSelect;
