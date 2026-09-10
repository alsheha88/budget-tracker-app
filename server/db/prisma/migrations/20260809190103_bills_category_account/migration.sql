/*
  Warnings:

  - Changed the type of `frequency` on the `Bill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "accountId" UUID,
ADD COLUMN     "categoryId" UUID,
ADD COLUMN     "notes" TEXT,
DROP COLUMN "frequency",
ADD COLUMN     "frequency" "Period" NOT NULL;

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "alertThreshold" INTEGER NOT NULL DEFAULT 80,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "rollover" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
