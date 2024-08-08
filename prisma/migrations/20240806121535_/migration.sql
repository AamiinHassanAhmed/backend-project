-- AlterTable
CREATE SEQUENCE cart_cr_id_seq;
ALTER TABLE "Cart" ALTER COLUMN "Cr_Id" SET DEFAULT nextval('cart_cr_id_seq');
ALTER SEQUENCE cart_cr_id_seq OWNED BY "Cart"."Cr_Id";
