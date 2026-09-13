import { prisma } from "../../../lib/prisma.js";
import { getCurrentPeriod } from "../../../lib/utility.js";
import type { BuyInvestmentData } from "../../../schemas/investment/investment.js";

export const dbBuyInvestment = (userId: string, data: BuyInvestmentData) => {
	return prisma.$transaction(async (tx) => {
		const existing = await tx.investment.findFirst({
			where: { userId, asset: data.asset },
		});

		let investment;
		if (existing) {
			const oldShares = Number(existing.shares);
			const oldPrice = Number(existing.purchasePrice);
			const totalShares = oldShares + data.shares;
			const avgPrice =
				(oldShares * oldPrice + data.shares * data.purchasePrice) / totalShares;
			investment = await tx.investment.update({
				where: { id: existing.id },
				data: { shares: totalShares, purchasePrice: avgPrice },
			});
		} else {
			investment = await tx.investment.create({
				data: {
					asset: data.asset,
					category: data.category,
					shares: data.shares,
					purchasePrice: data.purchasePrice,
					currentPrice: data.purchasePrice,
					platform: data.platform ?? null,
					userId,
				},
			});
		}

		const transaction = await tx.transaction.create({
			data: {
				merchant: data.asset,
				type: "Transfer",
				amount: -(data.shares * data.purchasePrice),
				date: new Date(),
				accountId: data.accountId,
				investmentId: investment.id,
				userId,
			},
		});

		return { investment, transaction };
	});
};

export const dbGetInvestments = async (userId: string) => {
	return prisma.investment.findMany({ where: { userId } });
};
export const dbGetInvestment = async (id: string) => {
	return prisma.investment.findUnique({ where: { id } });
};

export const dbGetInvestmentStats = async (userId: string) => {
	const { startDate, endDate } = getCurrentPeriod("monthly");

	const [historicalInvestments, investments] = await Promise.all([
		prisma.transaction.groupBy({
			by: ["investmentId"],
			where: {
				userId,
				date: { gte: startDate, lte: endDate },
				investmentId: { not: null },
			},
			_sum: { amount: true },
		}),
		dbGetInvestments(userId),
	]);
	const categoryValues = investments.reduce(
		(acc, i) => {
			const value = Number(i.shares) * Number(i.currentPrice);
			acc[i.category] = (acc[i.category] || 0) + value;
			return acc;
		},
		{} as Record<string, number>,
	);
	const totalValue = Object.values(categoryValues).reduce((a, b) => a + b, 0);
	const investmentsByCategory = Object.entries(categoryValues).map(
		([category, value]) => ({
			category,
			value,
			percentage: totalValue ? (value / totalValue) * 100 : 0,
		}),
	);
	const investmentStats = investments.map((i) => {
		const currentValue = Number(i.shares) * Number(i.currentPrice);
		const invested = Number(i.shares) * Number(i.purchasePrice);
		const gainLoss = currentValue - invested;

		return {
			...i,
			currentValue,
			invested,
			gainLoss,
			percent: invested ? (gainLoss / invested) * 100 : 0,
		};
	});
	const totalInvested = investmentStats.reduce((a, i) => a + i.invested, 0);
	const totalGainLoss = totalValue - totalInvested;
	const totalGainLossPercent = totalInvested
		? (totalGainLoss / totalInvested) * 100
		: 0;

	return {
		historicalInvestments,
		investmentsByCategory,
		investmentStats,
		summary: {
            totalValue,
			totalInvested,
			totalGainLoss,
			totalGainLossPercent,
		},
	};
};
