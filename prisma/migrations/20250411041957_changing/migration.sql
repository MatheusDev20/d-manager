/*
  Warnings:

  - You are about to drop the column `differenceInMinutes` on the `dailys` table. All the data in the column will be lost.
  - Added the required column `durationInMinutes` to the `dailys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dailys" DROP COLUMN "differenceInMinutes",
ADD COLUMN     "durationInMinutes" INTEGER NOT NULL;
