/*
  Warnings:

  - Added the required column `developerId` to the `pending_tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pending_tasks" ADD COLUMN     "developerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "pending_tasks" ADD CONSTRAINT "pending_tasks_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "developers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
