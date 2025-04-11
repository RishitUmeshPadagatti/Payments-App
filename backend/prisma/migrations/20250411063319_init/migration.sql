-- CreateEnum
CREATE TYPE "ShopType" AS ENUM ('CAFE', 'BOOKSTORE', 'PLANT', 'STATIONARY', 'BAKERY');

-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "landscapePicture" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "ShopType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_email_key" ON "Shop"("email");
