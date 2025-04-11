-- CreateTable
CREATE TABLE "dailys" (
    "id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,
    "numberOfTasksCreated" INTEGER NOT NULL,
    "wasFinishedInTime" BOOLEAN NOT NULL,

    CONSTRAINT "dailys_pkey" PRIMARY KEY ("id")
);
