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
exports.getUserById = exports.getAuthenticatedUser = exports.getUsersList = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
function getUsersList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const allUsers = yield users_model_1.default.find({}).select("-password");
        return res.status(200).json({ data: allUsers });
    });
}
exports.getUsersList = getUsersList;
function getAuthenticatedUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req;
            const user = yield users_model_1.default.findById({ _id: userId }).select("-password").lean();
            if (!user) {
                return res.status(401).json({ error: "Authentication Failed." });
            }
            return res.status(200).json({ data: user });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAuthenticatedUser = getAuthenticatedUser;
function getUserById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield users_model_1.default.findById({ _id: id }).select("-password").lean();
            if (!user) {
                return res.status(401).json({ error: "Authentication Failed." });
            }
            return res.status(200).json({ data: user });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getUserById = getUserById;
