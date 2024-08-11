-- CreateTable
CREATE TABLE "Review" (
    "Rev_Id" SERIAL NOT NULL,
    "Rating" INTEGER NOT NULL,
    "Comment" TEXT,
    "Author_Id" INTEGER NOT NULL,
    "Pr_Id" INTEGER NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("Rev_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_Author_Id_key" ON "Review"("Author_Id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_Pr_Id_fkey" FOREIGN KEY ("Pr_Id") REFERENCES "Product"("Pr_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
