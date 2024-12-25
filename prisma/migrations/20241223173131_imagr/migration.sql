/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `LeaveRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "imagePath",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "LeaveRequest" DROP COLUMN "imagePath",
ADD COLUMN     "image" TEXT;
