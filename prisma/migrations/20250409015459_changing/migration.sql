/*
  Warnings:

  - You are about to drop the `pending_tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pending_tasks" DROP CONSTRAINT "pending_tasks_developerId_fkey";

-- DropTable
DROP TABLE "pending_tasks";

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "customer" TEXT,
    "developerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "developers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
