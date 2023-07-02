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
exports.clearTokens = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../models/users.model"));
const dev = process.env.NODE_ENV === "development";
const generateJWT = (userId, secret, expirationTime, roles) => {
    return jsonwebtoken_1.default.sign({
        userId,
        roles,
    }, secret, { expiresIn: expirationTime });
};
exports.generateJWT = generateJWT;
const clearTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (refreshToken) {
        const user = yield users_model_1.default.findOneAndUpdate({
            "refreshToken.refreshToken": refreshToken,
        }, { $unset: { refreshToken: 1 } });
    }
});
exports.clearTokens = clearTokens;
