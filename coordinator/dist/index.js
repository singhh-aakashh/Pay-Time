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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/wallet/withdraw", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId, accountId, amount } = req.body;
    let prepare = false;
    try {
        const response = yield axios_1.default.post("http://localhost:3001/wallet/withdraw/ready", { walletId, amount });
        if (response.status === 200) {
            const checkBank = yield axios_1.default.post("http://localhost:3000/bank/deposite/ready", { accountId });
            if (checkBank.status === 200) {
                prepare = true;
            }
        }
        else {
            res.status(200).json({ "msg": "not ready" });
        }
        if (prepare) {
            const withdrawWallet = yield axios_1.default.post("http://localhost:3001/wallet/withdraw", { walletId, amount });
            if (withdrawWallet.status === 200) {
                const depositeBank = yield axios_1.default.post("http://localhost:3000/bank/deposite", { accountId, amount });
                if (depositeBank.status === 200) {
                    res.status(200).json({ "msg": "transaction success" });
                }
            }
            else {
                res.status(200).json({ "msg": "tranaction failed" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}));
app.listen(3002, () => {
    console.log("coordinator in 3002");
});
