-- CreateTable
CREATE TABLE "Cart_Item" (
    "Ct_Id" SERIAL NOT NULL,
    "Pr_Id" INTEGER NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Quant" INTEGER NOT NULL,
    "Updated_At" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cart_Item_pkey" PRIMARY KEY ("Ct_Id")
);

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_Pr_Id_fkey" FOREIGN KEY ("Pr_Id") REFERENCES "Product"("Pr_Id") ON DELETE CASCADE ON UPDATE CASCADE;
