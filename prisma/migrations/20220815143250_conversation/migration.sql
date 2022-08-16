/*
  Warnings:

  - Added the required column `avatar` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "admins" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "avatar" TEXT NOT NULL;
