/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_Author_Id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_Ca_Id_fkey";

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "category" (
    "Ca_Id" SERIAL NOT NULL,
    "Ca_Name" TEXT NOT NULL,
    "Ca_Desc" TEXT NOT NULL,
    "Ca_Image" TEXT NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Publish" BOOLEAN NOT NULL DEFAULT false,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("Ca_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_Ca_Name_key" ON "category"("Ca_Name");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Ca_Id_fkey" FOREIGN KEY ("Ca_Id") REFERENCES "category"("Ca_Id") ON DELETE CASCADE ON UPDATE CASCADE;
