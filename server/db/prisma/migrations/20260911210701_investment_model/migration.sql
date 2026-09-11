-- CreateEnum
CREATE TYPE "InvestmentCategory" AS ENUM ('stocks', 'ETF', 'crypto', 'funds', 'commodity', 'other');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "investmentId" UUID;

-- CreateTable
CREATE TABLE "Investment" (
    "id" UUID NOT NULL,
    "asset" TEXT NOT NULL,
    "category" "InvestmentCategory" NOT NULL,
    "shares" DECIMAL(65,30) NOT NULL,
    "purchasePrice" DECIMAL(65,30) NOT NULL,
    "currentPrice" DECIMAL(65,30) NOT NULL,
    "platform" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
