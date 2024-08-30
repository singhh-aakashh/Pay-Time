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
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/bank/deposite/ready", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId } = req.body;
    try {
        const account = yield prisma.bankAccount.findUnique({ where: { accountId } });
        if (account) {
            res.status(200).json({ account });
        }
        else {
            res.status(404).json({ "msg": "account not present" });
        }
    }
    catch (error) {
        console.log(error);
        res.send(500).json({ error });
    }
}));
app.post("/bank/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId } = req.body;
    try {
        const account = yield prisma.bankAccount.findUnique({ where: { accountId } });
        if (!account) {
            const newAccount = yield prisma.bankAccount.create({
                data: {
                    accountId,
                    balance: 0
                }
            });
            res.status(200).json({ "msg": "new account created successfull", newAccount });
        }
        else {
            res.send(404).json({ "msg": "account already present" });
        }
    }
    catch (error) {
        console.log(error);
        res.send(500).json({ error });
    }
}));
app.post("/bank/balance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId } = req.body;
    try {
        const account = yield prisma.bankAccount.findUnique({ where: { accountId } });
        if (!account) {
            res.status(404).json({ "msg": "account not present" });
        }
        else {
            res.status(200).json({ "balance is ": account.balance });
        }
    }
    catch (error) {
        console.log(error);
        res.send(500).json({ error });
    }
}));
app.post("/bank/deposite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId, amount } = req.body;
    try {
        const account = yield prisma.bankAccount.update({
            where: {
                accountId
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
        res.send(500).json({ error });
    }
}));
app.listen(3000, () => {
    console.log("bank is running on 3000");
});
