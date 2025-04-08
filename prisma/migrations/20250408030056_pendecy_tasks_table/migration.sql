-- AlterTable
ALTER TABLE "Developer" ALTER COLUMN "status" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "pending_tasks" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pending_tasks_pkey" PRIMARY KEY ("id")
);
