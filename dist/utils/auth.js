"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dev = process.env.NODE_ENV === "development";
const generateJWT = (userId, secret, expirationTime) => {
    return jsonwebtoken_1.default.sign({
        userId,
    }, secret, { expiresIn: expirationTime });
};
exports.generateJWT = generateJWT;
// const clearTokens = async (req: Request, res: Response) => {
//   const { signedCookies = {} } = req;
//   const { refreshToken } = signedCookies;
//   if (refreshToken) {
//     const index = tokens.findIndex((token) => token.refreshToken === refreshToken);
//     if (index) {
//       tokens.splice(index, 1);
//     }
//   }
//   res.clearCookie("refreshToken", {
//     httpOnly: true,
//     secure: !dev,
//     signed: true,
//   });
// };
