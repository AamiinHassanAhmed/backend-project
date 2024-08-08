/*
  Warnings:

  - You are about to drop the column `Pr_Image` on the `Product` table. All the data in the column will be lost.
  - Added the required column `tags` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Pr_Image",
ADD COLUMN     "tags" TEXT NOT NULL;
