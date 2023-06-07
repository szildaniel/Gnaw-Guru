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
exports.userRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const userController = __importStar(require("../controllers/user.controller"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
// @route GET api/users/list
// @desc Get list of users
// @access private
userRouter.post("/list", auth_1.isAuthenticated, userController.getUsersList);
// @route POST api/users/login
// @desc Get authenticated user
// @access pubic
userRouter.post("/me", auth_1.isAuthenticated, userController.getAuthenticatedUser);
// @route POST api/users/refresh
// @desc Get user by id
// @access private
userRouter.post("/:id", auth_1.isAuthenticated, userController.getUserById);
