function TableHeader() {
	return (
		<div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-center justify-between py-3.5 px-4" role="columnheader">
			<p className="text-label-md text-input-placeholder">DATE</p>
			<p className="text-label-md text-input-placeholder">
				MERCHANT / DESCRIPTION
			</p>
			<p className="text-label-md text-input-placeholder">CATEGORY</p>
			<p className="text-label-md text-input-placeholder">ACCOUNT</p>
			<p className="text-label-md text-input-placeholder">AMOUNT</p>
		</div>
	);
}

export default TableHeader;
