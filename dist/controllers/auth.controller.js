"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logoutOne = exports.refreshOne = exports.loginOne = exports.registerOne = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const authServices = __importStar(require("../services/auth.services"));
const express_validator_1 = require("express-validator");
function registerOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            });
        }
        const { email } = req.body;
        try {
            const userExist = yield users_model_1.default.findOne({ email });
            if (userExist) {
                return res.status(422).json({
                    error: "Username or email already exists",
                });
            }
            let newUser = Object.assign({}, req.body);
            newUser = Object.assign(Object.assign({}, newUser), { roles: [2001] });
            const registerUser = yield authServices.register(newUser, next);
        }
        catch (error) {
            console.log("Server error!");
            return res.sendStatus(500);
        }
    });
}
exports.registerOne = registerOne;
function loginOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            });
        }
        const { email } = req.body;
        try {
            const user = yield users_model_1.default.findOne({ email });
            if (!user) {
                res.status(422).json({ error: "Login error: Invalid credentials" });
            }
            else {
                yield authServices.login(user, req, res, next);
            }
        }
        catch (error) {
            console.log("Server error! Can't login!");
            return res.sendStatus(500);
        }
    });
}
exports.loginOne = loginOne;
function refreshOne(req, res) {
    console.log("refresh token working");
    return res.sendStatus(200);
}
exports.refreshOne = refreshOne;
function logoutOne(req, res) {
    console.log("logout route working");
    return res.sendStatus(200);
}
exports.logoutOne = logoutOne;
