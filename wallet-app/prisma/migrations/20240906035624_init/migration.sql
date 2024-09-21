/*
  Warnings:

  - The values [SENT,RECEIVED] on the enum `TYPE` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('Fulfilled', 'Declined');

-- AlterEnum
BEGIN;
CREATE TYPE "TYPE_new" AS ENUM ('Sent', 'Received');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TYPE_new" USING ("type"::text::"TYPE_new");
ALTER TYPE "TYPE" RENAME TO "TYPE_old";
ALTER TYPE "TYPE_new" RENAME TO "TYPE";
DROP TYPE "TYPE_old";
COMMIT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL;
