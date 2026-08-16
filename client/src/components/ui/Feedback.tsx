type FeedbackProps = {
	message: string;
	messageCode: "warning" | "success" | "error" | "info";
};

function Feedback({ message, messageCode }: FeedbackProps) {
	const colorCode = {
		warning: "bg-feedback-warning",
		success: "bg-feedback-success",
		error: "bg-feedback-error",
		info: "bg-feedback-info",
	};
	return (
		<div className="flex items-center gap-3 px-4 py-3 rounded-md bg-table-row-hover border border-interactive-secondary shadow-sm">
			<span className={`${colorCode[messageCode]} w-2 h-2 rounded-full`}></span>
			<p className="text-body-sm text-text-primary">{message}</p>
		</div>
	);
}

export default Feedback;
