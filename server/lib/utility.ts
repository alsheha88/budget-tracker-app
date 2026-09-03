export const getCurrentPeriod = (period: "weekly" | "monthly" | "yearly") => {
	let startDate: Date;
	let endDate:Date;
	const now = new Date();

	if (period === "weekly") {
		startDate = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() - now.getDay(),
		);
		endDate = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() - now.getDay() + 6,
		);
	} else if (period === "monthly") {
		startDate = new Date(now.getFullYear(), now.getMonth(), 1);
		endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // last day of month
	} else {
		startDate = new Date(now.getFullYear(), 0, 1);
		endDate = new Date(now.getFullYear(), 11, 31); // Dec 31
	}

	return { startDate, endDate };
};
