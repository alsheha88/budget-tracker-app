import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { useId } from "react";

type SelectProps = {
	label: string;
	options: { label: string; value: string }[];
	placeholder: string;
	error?: string;
	value?: string; 
	onValueChange?: (value: string) => void;
};

function SelectComponent({ label, options, placeholder, value, onValueChange }: SelectProps) {
	const labelId = useId();
	return (
		<div className="flex flex-col gap-2">
			<label id={labelId} className="text-sidebar-foreground text-caption-lg">
				{label}
			</label>
			<Select.Root value={value} onValueChange={onValueChange}>
				<Select.Trigger
					aria-labelledby={labelId}
					className="min-w-2xs flex items-center justify-between gap-2 p-3 bg-input-background border border-border-default rounded-sm text-body-sm text-text-primary cursor-pointer focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-border-focus data-state-open:border-border-focus">
					<Select.Value placeholder={placeholder} />
					<Select.Icon>
						<ChevronDown />
					</Select.Icon>
				</Select.Trigger>
				<Select.Portal>
					<Select.Content
						position="popper"
						sideOffset={4}
						className="w-(--radix-select-trigger-width) p-1 bg-input-background rounded-sm border border-border-default">
						<Select.ScrollUpButton className="text-text-primary">
							<ChevronUp />
						</Select.ScrollUpButton>
						<Select.Viewport className="max-h-36">
							{options.map((o) => (
								<Select.Item
									key={o.value}
									value={o.value}
									className="flex items-center justify-between p-2.5 text-sidebar-foreground text-body-sm data-checked:bg-category-groceries data-checked:text-toggle-on data-highlighted:bg-category-groceries data-highlighted:text-toggle-on rounded-[6px] focus:outline-none hover:outline-none cursor-pointer">
									<Select.ItemText>{o.label}</Select.ItemText>
									<Select.ItemIndicator>
										<Check />
									</Select.ItemIndicator>
								</Select.Item>
							))}
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
		</div>
	);
}

export default SelectComponent;
