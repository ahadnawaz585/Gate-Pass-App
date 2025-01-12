/*
  Warnings:

  - Added the required column `allocationStartDate` to the `LeaveAllocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaveAllocation" ADD COLUMN     "allocationEndDate" TIMESTAMP(3),
ADD COLUMN     "allocationStartDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LeaveConfiguration" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LeaveRequest" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
