-- AlterTable
ALTER TABLE "AttendanceScheduler" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);
