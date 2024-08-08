/*
  Warnings:

  - You are about to drop the column `userId` on the `Cart_Item` table. All the data in the column will be lost.
  - You are about to drop the column `defaultBillinggAddress` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart_Item" DROP CONSTRAINT "Cart_Item_userId_fkey";

-- AlterTable
ALTER TABLE "Cart_Item" DROP COLUMN "userId",
ADD COLUMN     "Cr_Id" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Author_Id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "Ca_Id" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "defaultBillinggAddress",
ADD COLUMN     "defaultBillingAddress" INTEGER;

-- CreateTable
CREATE TABLE "Category" (
    "Ca_Id" SERIAL NOT NULL,
    "Ca_Name" TEXT NOT NULL,
    "Ca_Desc" TEXT NOT NULL,
    "Ca_Image" TEXT NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Publish" BOOLEAN NOT NULL DEFAULT false,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("Ca_Id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "Cr_Id" INTEGER NOT NULL,
    "U_Id" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("Cr_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_Ca_Name_key" ON "Category"("Ca_Name");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Ca_Id_fkey" FOREIGN KEY ("Ca_Id") REFERENCES "Category"("Ca_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_U_Id_fkey" FOREIGN KEY ("U_Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_Cr_Id_fkey" FOREIGN KEY ("Cr_Id") REFERENCES "Cart"("Cr_Id") ON DELETE CASCADE ON UPDATE CASCADE;
