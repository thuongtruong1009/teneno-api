/*
  Warnings:

  - You are about to drop the column `favouritorId` on the `posts` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_favouritorId_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "favouritorId",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "reactions" (
    "id" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reactions_id_key" ON "reactions"("id");

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
