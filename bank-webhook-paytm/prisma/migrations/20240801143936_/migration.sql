-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_accountId_key" ON "BankAccount"("accountId");
