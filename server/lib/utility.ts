export const getCurrentPeriod = (
	period: "weekly" | "monthly" | "yearly",
) => {
	let startDate: Date;
    const now = new Date();
	const endDate = new Date();

	if (period === "weekly") {
		startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()) ;
	} else if (period === "monthly") {
		startDate = new Date(now.getFullYear(), now.getMonth(), 1);
	} else {
		startDate = new Date(now.getFullYear(), 0, 1);
	}

	return { startDate, endDate };
};
