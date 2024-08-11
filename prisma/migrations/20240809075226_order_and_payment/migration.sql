-- CreateEnum
CREATE TYPE "O_Status" AS ENUM ('Delivered', 'Not_Delivered');

-- CreateTable
CREATE TABLE "Order" (
    "Or_Id" SERIAL NOT NULL,
    "Or_Status" "O_Status" NOT NULL DEFAULT 'Not_Delivered',
    "Items" JSONB[],
    "Or_Total" DOUBLE PRECISION NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "Cr_Id" INTEGER NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("Or_Id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "Pa_Id" SERIAL NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "D_Amount" DOUBLE PRECISION NOT NULL,
    "S_Total" DOUBLE PRECISION NOT NULL,
    "Paid" DOUBLE PRECISION NOT NULL,
    "Balance" DOUBLE PRECISION NOT NULL,
    "Us_Id" INTEGER NOT NULL,
    "Or_Id" INTEGER NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("Pa_Id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_Us_Id_fkey" FOREIGN KEY ("Us_Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_Or_Id_fkey" FOREIGN KEY ("Or_Id") REFERENCES "Order"("Or_Id") ON DELETE CASCADE ON UPDATE CASCADE;
