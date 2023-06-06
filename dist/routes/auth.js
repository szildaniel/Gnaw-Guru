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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController = __importStar(require("../controllers/auth.controller"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../middlewares/auth");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
// @route POST api/register
// @desc Register  User
// @access pubic
authRouter.post("/register", [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Please enter a password with 6 or more characters and less than 20 characters.").isLength({
        min: 6,
        max: 20,
    }),
], authController.registerOne, auth_1.generateAuthToken);
// @route POST api/login
// @desc Login User
// @access pubic
authRouter.post("/login", [
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Please enter a password with 6 or more characters and less than 20 characters.").isLength({
        min: 6,
        max: 20,
    }),
], authController.loginOne, auth_1.generateAuthToken);
// @route POST api/refresh
// @desc Refresh auth token User
// @access private
authRouter.post("/refresh", authController.refreshOne);
// @route POST api/logout
// @desc Logout User
// @access private
authRouter.post("/logout", authController.logoutOne);
