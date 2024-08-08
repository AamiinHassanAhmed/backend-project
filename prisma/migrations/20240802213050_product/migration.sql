-- CreateTable
CREATE TABLE "Product" (
    "Pr_Id" SERIAL NOT NULL,
    "Pr_Name" TEXT NOT NULL,
    "Pr_Desc" TEXT NOT NULL,
    "Pr_Price" DOUBLE PRECISION NOT NULL,
    "Pr_Quantity" INTEGER NOT NULL,
    "Pr_Image" TEXT NOT NULL,
    "Published" BOOLEAN NOT NULL DEFAULT false,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Arrival" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("Pr_Id")
);
