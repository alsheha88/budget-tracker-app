import { cn } from "../../lib/cn";

type InputProps = {
	label?: string;
	type: "text" | "password";
	placeholder?: string;
	required?: boolean;
	error?: string;
    id: string
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({
	label,
	type,
	placeholder,
	required,
	error,
    id,
	...props
}: InputProps) {
	return (
		<div className="grid gap-1.5">
			{label && (
				<label htmlFor={id} className="text-text-secondary text-caption-lg">
					{label}
				</label>
			)}
			<div className="flex flex-col gap-1">
				<input
					type={type}
					placeholder={placeholder}
                    id={id}
					className={cn(
						`px-3 py-2.5 bg-bg-tertiary border placeholder:text-input-placeholder text-body-sm rounded-sm text-text-primary focus:outline-none focus:ring-2`,
						error
							? "border-ring-destructive focus:ring-ring-destructive"
							: "border-border-default focus:ring-ring-default",
					)}
					{...props}
				/>
				{error && (
					<small className="text-caption-sm text-ring-destructive">
						{error}
					</small>
				)}
			</div>
		</div>
	);
}

export default Input;
