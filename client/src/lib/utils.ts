export const formatMonthShort = (date: string | Date | undefined) => {
	if (!date) return "";
	return Intl.DateTimeFormat("en-US", { month: "short" }).format(
		new Date(date),
	);
};

export const formatDateShort = (date: string) => {
	return Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
	}).format(new Date(date));
};

export const capitalizeFirstLetter = (str: string) => {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const range = (start: number, end: number) => {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const getPageNumbers = (
	currentPage: number,
	totalPages: number,
	siblingCount = 1,
) => {
	const leftSibling = Math.max(currentPage - siblingCount, 1);
	const rightSibling = Math.min(currentPage + siblingCount, totalPages);
	const showLeftDots = leftSibling > 2;
	const showRightDots = rightSibling < totalPages - 1;
	const dots = "...";

	if (totalPages <= 5) {
		return range(1, totalPages);
	} else if (!showLeftDots && showRightDots) {
		return [...range(1, 5), dots, totalPages]; // near start
	} else if (showLeftDots && !showRightDots) {
		return [1, dots, ...range(totalPages - 4, totalPages)]; // near end
	} else {
		return [1, dots, ...range(leftSibling, rightSibling), dots, totalPages]; // middle
	}
};

export const formatKWD = (amount: number) =>
	new Intl.NumberFormat("en-KW", {
		style: "currency",
		currency: "KWD",
	}).format(amount);

export const getInitials = (name: string) => {
	if (!name) return null;
	if (!name.includes(" ")) {
		return name.slice(0, 2).toUpperCase();
	} else {
		const split = name.split(" ");

		return split[0].charAt(0).toUpperCase() + split[1]?.charAt(0).toUpperCase();
	}
};

