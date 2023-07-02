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
exports.isAuthenticated = exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const users_model_1 = __importDefault(require("../models/users.model"));
const auth_1 = require("../utils/auth");
const ms_1 = __importDefault(require("ms"));
const customError_model_1 = require("../models/customError.model");
const dev = process.env.NODE_ENV === "development";
const refreshTokenLife = config_1.default.get("REFRESH_TOKEN_LIFE");
const refreshSecretKey = config_1.default.get("SECRET_REFRESH_KEY");
const accessTokenLife = config_1.default.get("ACCESS_TOKEN_LIFE");
const accessSecretKey = config_1.default.get("SECRET_ACCESS_KEY");
const generateAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield users_model_1.default.findOne({ email: email });
        if (user) {
            const refreshToken = (0, auth_1.generateJWT)(user._id.toString(), refreshSecretKey, refreshTokenLife);
            const accessToken = (0, auth_1.generateJWT)(user._id.toString(), accessSecretKey, accessTokenLife, user.roles);
            const token = {
                refreshToken,
                expirationTime: new Date(Date.now() + (0, ms_1.default)(refreshTokenLife)),
            };
            const updatedUser = yield users_model_1.default.findOneAndUpdate({ _id: user._id }, { refreshToken: token });
            const expiresAt = new Date(Date.now() + (0, ms_1.default)(accessTokenLife));
            return res.status(200).json({
                name: user.name,
                expiresAt,
                accessToken: accessToken,
                refreshToken: token,
            });
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.generateAuthToken = generateAuthToken;
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!accessToken) {
            throw new customError_model_1.CustomError("Not authorized.", 401);
        }
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.verify(accessToken, accessSecretKey);
        }
        catch (err) {
            throw new customError_model_1.CustomError("Not authorized.", 401);
        }
        const decodedId = decodedToken.userId;
        const user = yield users_model_1.default.findOne({ _id: decodedId });
        if (!user) {
            throw new customError_model_1.CustomError("Not authorized.", 401);
        }
        req.userId = user._id.toString();
        req.roles = user.roles;
        return next();
    }
    catch (error) {
        next(error);
    }
});
exports.isAuthenticated = isAuthenticated;
