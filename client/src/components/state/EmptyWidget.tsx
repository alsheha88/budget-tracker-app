type WidgetEmptyProps = {
	message: string;
	icon?: React.ReactNode;
};

function WidgetEmpty({ message, icon }: WidgetEmptyProps) {
	return (
		<div className="grid place-items-center gap-2 py-8 text-center">
			{icon}
			<p className="text-body-lg text-sidebar-foreground">{message}</p>
		</div>
	);
}

export default WidgetEmpty;
