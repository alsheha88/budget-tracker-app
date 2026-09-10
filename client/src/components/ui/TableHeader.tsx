type TableHeaderProps = {
	headers: string[];
	gridCol: string;
};

function TableHeader({ headers, gridCol }: TableHeaderProps) {
	return (
		<div
			className={`hidden lg:grid lg:grid-cols-[${gridCol}] items-center justify-between py-3.5 px-4`}
			role="columnheader">
			{headers.map((h) => (
				<p key={h} className="text-label-md text-input-placeholder">
					{h}
				</p>
			))}
		</div>
	);
}
export default TableHeader;
