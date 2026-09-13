import { z } from "zod";

export const buyInvestmentSchema = z.object({
	asset: z.string().min(1, "This field is required"),
	category: z.enum(["stocks", "ETF", "crypto", "funds", "commodity", "other"]),
	shares: z.number().positive().multipleOf(0.1).max(1_000_000_000),
	purchasePrice: z.number().positive().multipleOf(0.1).max(1_000_000_000),
	accountId: z.uuid(),
	platform: z.string().nullable(),
});

export type BuyInvestmentData = z.infer<typeof buyInvestmentSchema>;