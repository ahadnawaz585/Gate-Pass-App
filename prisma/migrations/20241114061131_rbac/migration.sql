/*
  Warnings:

  - You are about to drop the column `issuedAt` on the `GatePass` table. All the data in the column will be lost.
  - You are about to drop the column `validUntil` on the `GatePass` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ParentType" AS ENUM ('Role', 'User', 'Group');

-- AlterTable
ALTER TABLE "GatePass" DROP COLUMN "issuedAt",
DROP COLUMN "validUntil";

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(36) NOT NULL,
    "username" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "isDeleted" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "readAccess" JSONB,
    "writeAccess" JSONB,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "isDeleted" TIMESTAMP(3),

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "groupId" VARCHAR(36) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "isDeleted" TIMESTAMP(3),

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "readAccess" JSONB,
    "writeAccess" JSONB,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "isDeleted" TIMESTAMP(3),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "roleId" VARCHAR(36) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "isDeleted" TIMESTAMP(3),

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupRole" (
    "id" VARCHAR(36) NOT NULL,
    "groupId" VARCHAR(36) NOT NULL,
    "roleId" VARCHAR(36) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "isDeleted" TIMESTAMP(3),

    CONSTRAINT "GroupRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppFeature" (
    "name" VARCHAR(256) NOT NULL,
    "parentFeatureId" VARCHAR(256),
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "isDeleted" TIMESTAMP(3),

    CONSTRAINT "AppFeature_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "FeaturePermission" (
    "id" VARCHAR(36) NOT NULL,
    "parentType" "ParentType" NOT NULL,
    "parentId" VARCHAR(36) NOT NULL,
    "permissions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "isDeleted" TIMESTAMP(3),

    CONSTRAINT "FeaturePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlacklistToken" (
    "id" VARCHAR(36) NOT NULL,
    "token" TEXT NOT NULL,
    "rememberMe" BOOLEAN NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3),

    CONSTRAINT "BlacklistToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedInUsers" (
    "id" VARCHAR(36) NOT NULL,
    "token" TEXT NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "rememberMe" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3),

    CONSTRAINT "LoggedInUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_userId_groupId_key" ON "UserGroup"("userId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_roleId_key" ON "UserRole"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupRole_groupId_roleId_key" ON "GroupRole"("groupId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "BlacklistToken_token_key" ON "BlacklistToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "LoggedInUsers_token_key" ON "LoggedInUsers"("token");

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRole" ADD CONSTRAINT "GroupRole_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRole" ADD CONSTRAINT "GroupRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppFeature" ADD CONSTRAINT "AppFeature_parentFeatureId_fkey" FOREIGN KEY ("parentFeatureId") REFERENCES "AppFeature"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlacklistToken" ADD CONSTRAINT "BlacklistToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedInUsers" ADD CONSTRAINT "LoggedInUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
