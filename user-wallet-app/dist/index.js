"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
const prisma = new client_1.PrismaClient();
app.post("/wallet/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId } = req.body;
    try {
        const wallet = yield prisma.wallet.findUnique({ where: { walletId } });
        if (!wallet) {
            const newWallet = yield prisma.wallet.create({
                data: {
                    walletId,
                    balance: 0
                }
            });
            res.status(200).json({ "msg": "new wallet created successfull", newWallet });
        }
        else {
            res.status(500).json({ "msg": "wallet already present" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}));
app.post("/wallet/balance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId } = req.body;
    console.log("req wallet id", typeof (walletId), walletId);
    try {
        const wallet = yield prisma.wallet.findUnique({ where: { walletId } });
        if (!wallet) {
            res.status(404).json({ "msg": "account not present" });
        }
        else {
            res.status(200).json({ "balance is ": wallet.balance });
        }
    }
    catch (error) {
        console.log("error");
        res.status(500).json({ error });
    }
}));
app.post("/wallet/deposite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId, amount } = req.body;
    try {
        const account = yield prisma.wallet.update({
            where: {
                walletId
            },
            data: {
                balance: {
                    increment: amount
                }
            }
        });
        res.status(200).json({ "msg": "transaction success" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}));
app.post("/wallet/deposite/ready", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId } = req.body;
    try {
        const wallet = yield prisma.wallet.findUnique({ where: { walletId } });
        if (wallet) {
            res.status(200).json({ wallet });
        }
        else {
            res.status(404).json({ "msg": "wallet not present" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}));
app.post("/wallet/withdraw/ready", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId, amount } = req.body;
    console.log("walletId ", typeof (walletId), walletId);
    console.log("amount ", typeof (amount), amount);
    try {
        const wallet = yield prisma.wallet.findUnique({ where: { walletId } });
        if (wallet && wallet.balance >= Number(amount)) {
            res.status(200).json({ "msg": "ready" });
        }
        else {
            res.status(201).json({ "msg": "not  ready" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}));
app.post("/wallet/withdraw", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId, amount } = req.body;
    try {
        const wallet = yield prisma.wallet.update({
            where: {
                walletId
            },
            data: {
                balance: {
                    decrement: amount
                }
            }
        });
        res.status(200).json({ "msg": "success" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}));
app.listen(3001, () => {
    console.log("wallet is running on 3001");
});
