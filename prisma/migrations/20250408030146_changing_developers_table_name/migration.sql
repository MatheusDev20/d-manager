/*
  Warnings:

  - You are about to drop the `Developer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Developer";

-- CreateTable
CREATE TABLE "developers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "picture" VARCHAR(255) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "developers_pkey" PRIMARY KEY ("id")
);
