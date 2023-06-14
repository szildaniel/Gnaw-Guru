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
exports.toothReportRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const reportController = __importStar(require("../controllers/report.controller"));
const verifyRoles_1 = require("../middlewares/verifyRoles");
const validationHelper_1 = require("../utils/validationHelper");
const toothReportRouter = (0, express_1.Router)();
exports.toothReportRouter = toothReportRouter;
// @route POST api/tooth-report
// @desc Create user tooth report
// @access private
toothReportRouter.post("/", auth_1.isAuthenticated, validationHelper_1.toothReportCustomValidation, reportController.createReport);
// @route PUT api/tooth-report/me
// @desc Update authenticated user report
// @access private
toothReportRouter.put("/", auth_1.isAuthenticated, validationHelper_1.toothReportCustomValidation, reportController.updateMyReport);
// @route PUT api/tooth-report/:reportId
// @desc Update  tooth report by report id
// @access private and only editor role
toothReportRouter.put("/:reportId", auth_1.isAuthenticated, (0, verifyRoles_1.verifyRoles)(["Editor"]), validationHelper_1.toothReportCustomValidation, reportController.updateReportById);
// @route PUT api/tooth-report/:userIdd
// @desc Update  tooth report by user id
// @access private and only editor role
toothReportRouter.put("/update-user-report/:userId", auth_1.isAuthenticated, (0, verifyRoles_1.verifyRoles)(["Editor"]), validationHelper_1.toothReportCustomValidation, reportController.updateReportByUserId);
