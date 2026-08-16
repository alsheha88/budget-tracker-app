import { cn } from "../../lib/cn";

type TextAreaProps = {
	label?: string;
	placeholder?: string;
	required?: boolean;
	error?: string;
	id: string;
	typedChar?: number;
	maxLength?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function TextArea({
	label,
	placeholder,
	required,
	error,
	id,
	typedChar = 0,
	maxLength = 500,
	...props
}: TextAreaProps) {
	return (
		<div className="grid gap-1.5">
			{label && (
				<label htmlFor={id} className="text-text-secondary text-caption-lg">
					{label}
				</label>
			)}
			<div className="flex flex-col gap-1">
				<div
					className={cn(
						"flex flex-col gap-3 px-3 py-2.5 bg-bg-tertiary border rounded-sm focus-within:ring-2",
						error
							? "border-ring-destructive focus-within:ring-ring-destructive"
							: "border-border-default focus-within:ring-ring-default",
					)}
				>
					<textarea
						placeholder={placeholder}
						id={id}
						maxLength={maxLength}
                        rows={4}
						className="w-full bg-transparent border-none outline-none resize-none placeholder:text-input-placeholder text-body-sm text-text-primary"
						{...props}
					/>
					<div
						className={cn(
							"text-end text-caption-md",
							typedChar <= maxLength
								? "text-primary-emerald-500"
								: "text-ring-destructive",
						)}
					>
						{typedChar}/{maxLength} chars
					</div>
				</div>
				{error && (
					<small className="text-caption-sm text-ring-destructive">
						{error}
					</small>
				)}
			</div>
		</div>
	);
}

export default TextArea;