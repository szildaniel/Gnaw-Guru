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
exports.login = exports.register = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function register(user, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const createUser = yield users_model_1.default.create(user);
        next();
    });
}
exports.register = register;
function login(user, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { password } = req.body;
            const isMatch = bcrypt_1.default.compareSync(password, user.password);
            if (isMatch) {
                next();
            }
            else {
                console.log(password);
                return res.status(422).json({ error: "Login error: Invalid credentials" });
            }
        }
        catch (error) { }
    });
}
exports.login = login;
