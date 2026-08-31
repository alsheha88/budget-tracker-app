import * as DropdownMenu from "radix-ui/dropdown-menu";

type DropdownProps = {
	trigger: React.ReactNode;
	children: React.ReactNode;
};

function DropdownMenuComponent({ trigger, children }: DropdownProps) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					sideOffset={4}
					align="end"
					className="flex flex-col min-w-32 p-2 bg-input-background border text-sidebar-foreground border-border-default rounded-sm z-50">
					{children}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}

export default DropdownMenuComponent;
