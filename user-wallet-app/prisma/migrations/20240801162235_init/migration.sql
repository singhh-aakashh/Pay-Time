-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_walletId_key" ON "Wallet"("walletId");
