/*
  Warnings:

  - Added the required column `day` to the `dailys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dailys" ADD COLUMN     "day" TEXT NOT NULL;
