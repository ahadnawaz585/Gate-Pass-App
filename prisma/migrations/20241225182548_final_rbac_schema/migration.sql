/*
  Warnings:

  - Added the required column `contactNo` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `martialStatus` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "contactNo" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "filePaths" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "martialStatus" TEXT NOT NULL,
ADD COLUMN     "noOfChildrens" INTEGER;
