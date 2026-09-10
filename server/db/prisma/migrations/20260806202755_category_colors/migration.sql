/*
  Warnings:

  - You are about to drop the column `background` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `foreground` on the `Category` table. All the data in the column will be lost.
  - Added the required column `color` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "background",
DROP COLUMN "foreground",
ADD COLUMN     "color" TEXT NOT NULL;
