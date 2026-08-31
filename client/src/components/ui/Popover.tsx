import * as Popover from "radix-ui/popover";

type PopoverProps = {
	children: React.ReactNode;
	triggerContent: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

function PopoverComponent({
	triggerContent,
	children,
	open,
	onOpenChange,
}: PopoverProps) {
	return (
		<Popover.Root open={open} onOpenChange={onOpenChange}>
			<Popover.Trigger className="flex items-center gap-1.5 bg-input-background p-3 border border-border-default rounded-sm text-text-primary text-body-sm cursor-pointer focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-border-focus data-state-open:border-border-focus">
				{triggerContent}
			</Popover.Trigger>

			<Popover.Portal>
				<Popover.Content
					sideOffset={4}
					side="bottom"
					className="w-(--radix-popover-trigger-width)"
				>
					{children}
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}

export default PopoverComponent;
