/*
  Warnings:

  - The values [quarterly] on the enum `Period` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Period_new" AS ENUM ('weekly', 'monthly', 'yearly');
ALTER TABLE "Bill" ALTER COLUMN "frequency" TYPE "Period_new" USING ("frequency"::text::"Period_new");
ALTER TABLE "Budget" ALTER COLUMN "period" TYPE "Period_new" USING ("period"::text::"Period_new");
ALTER TYPE "Period" RENAME TO "Period_old";
ALTER TYPE "Period_new" RENAME TO "Period";
DROP TYPE "public"."Period_old";
COMMIT;
