import * as Popover from "radix-ui/popover";


type PopoverProps = {
  children: React.ReactNode;
  triggerContent: React.ReactNode;

}

function PopoverComponent({triggerContent, children}:PopoverProps) {
	return (
		<Popover.Root>
			<Popover.Trigger className="w-80 max-w-[95%] flex items-center gap-1.5 bg-table-row-hover p-3 border border-border-default rounded-sm text-text-primary text-body-sm cursor-pointer focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-border-focus data-state-open:border-border-focus">
        {triggerContent}
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content sideOffset={4} side="bottom" className="w-(--radix-popover-trigger-width)">
					{children}
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}

export default PopoverComponent;
