-- CreateEnum
CREATE TYPE "ScheduleParent" AS ENUM ('LEAVE', 'ABSENT', 'CHECK_OUT');

-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('SUCCESS', 'FAIL', 'SKIP');

-- CreateTable
CREATE TABLE "AttendanceScheduler" (
    "id" VARCHAR(36) NOT NULL,
    "parent" "ScheduleParent" NOT NULL,
    "runTime" TIMESTAMP(3) NOT NULL,
    "status" "ScheduleStatus" NOT NULL,
    "log" TEXT,

    CONSTRAINT "AttendanceScheduler_pkey" PRIMARY KEY ("id")
);
