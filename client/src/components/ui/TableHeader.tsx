type TableHeaderProps = {
	headers: string[];
	gridCol: string;
};

function TableHeader({ headers, gridCol }: TableHeaderProps) {
	return (
		<div
			className={`grid grid-cols-[${gridCol}] items-center justify-between py-3.5 px-4`}
			role="columnheader">
			{headers.map((h) => (
				<p key={h} className="text-label-md text-input-placeholder">
					{h}
				</p>
			))}
		</div>
	);
}
// 0.5fr_2fr_1fr_1fr_1fr
export default TableHeader;
