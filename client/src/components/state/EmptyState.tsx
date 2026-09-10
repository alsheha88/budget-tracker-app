import { Button } from "../ui/Button";

type EmptyStateProps = {
	icon: React.ReactNode;
	title: string;
	message: string;
	btnText?: string;
	onAction?: () => void;
};

function EmptyState({
	icon,
	title,
	message,
	btnText,
	onAction,
}: EmptyStateProps) {
	return (
		<div className="grid gap-2 place-items-center">
			<div>{icon}</div>
			<div className="flex flex-col gap-3">
				<h3 className="text-h3 text-text-primary">{title}</h3>
				<p className="text-body-sm text-sidebar-foreground">{message}</p>
			</div>
			{btnText && (
				<Button type="button" size="lg" onClick={onAction}>
					{btnText}
				</Button>
			)}
		</div>
	);
}

export default EmptyState;
