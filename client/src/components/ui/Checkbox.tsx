import * as Checkbox from "radix-ui/checkbox";
import { CheckIcon } from "lucide-react";
import { useId } from "react";

type CheckboxProps = {
	label: string;
	checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

const CheckboxComponent = ({ label, checked, onCheckedChange }: CheckboxProps) => {
	const labelId = useId();
	return (
		<div className="flex items-center gap-2">
			<Checkbox.Root
				className="flex items-center justify-center w-5 h-5 bg-bg-secondary border border-border-strong rounded-xs data-[state=checked]:bg-accent-foreground cursor-pointer"
				checked={checked}
                onCheckedChange={onCheckedChange}
				id={labelId}>
				<Checkbox.Indicator>
					<CheckIcon width={16} height={16} />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<label className="text-text-secondary text-body-sm" htmlFor={labelId}>
				{label}
			</label>
		</div>
	);
};

export default CheckboxComponent;
