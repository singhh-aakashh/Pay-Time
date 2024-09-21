/*
  Warnings:

  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('Fulfilled', 'Declined');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "status" "STATUS" NOT NULL,
ADD COLUMN     "to" TEXT NOT NULL;
