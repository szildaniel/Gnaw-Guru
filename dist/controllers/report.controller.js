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
exports.updateReportByUserId = exports.updateReportById = exports.updateMyReport = exports.createReport = void 0;
const toothReport_model_1 = __importDefault(require("../models/toothReport.model"));
const users_model_1 = __importDefault(require("../models/users.model"));
const express_validator_1 = require("express-validator");
const toothReportService = __importStar(require("../services/report.services"));
const mongoose_1 = __importDefault(require("mongoose"));
function createReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { userId } = req;
            const foundUserReport = yield toothReport_model_1.default.findOne({ user: userId });
            if (foundUserReport) {
                console.error("Tooth Report for this user already exist!");
                return res.status(400).json({ msg: "Tooth Report for this user already exist!" });
            }
            const user = yield users_model_1.default.findOne({ _id: userId });
            if (!user) {
                return res.status(401).json({ msg: "Can't find user from token!" });
            }
            const newReport = Object.assign({ user: user._id }, req.body);
            toothReportService.create(newReport);
            res.status(200).json({ msg: "ToothReport added correctly.", data: newReport });
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.createReport = createReport;
function updateMyReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            });
        }
        const { userId } = req;
        try {
            const userReport = yield toothReport_model_1.default.findOne({ user: userId });
            if (!userReport) {
                return res.status(422).json({ error: "There is no tooth report for that user." });
            }
            const newReport = Object.assign({}, req.body);
            const updateUserReport = yield toothReportService.updateByUserId(newReport, userId);
            return res.status(200).json({ msg: "User tooth report updated", data: newReport });
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.updateMyReport = updateMyReport;
function updateReportById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            });
        }
        const { reportId } = req.params;
        try {
            const isValid = mongoose_1.default.Types.ObjectId.isValid(reportId);
            if (!isValid) {
                return res.status(422).json({ error: "Tooth report with this id not exist." });
            }
            const foundReport = yield toothReport_model_1.default.findOne({ _id: reportId });
            if (!foundReport) {
                return res.status(422).json({ error: "Tooth report with this id not exist." });
            }
            const newReport = Object.assign({}, req.body);
            toothReportService.update(newReport, reportId);
            res.status(200).json({ msg: "Tooth Report Updated", data: newReport });
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.updateReportById = updateReportById;
function updateReportByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            });
        }
        const { userId } = req.params;
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ error: "Invalid userId" });
            }
            const foundUser = yield users_model_1.default.findById({ _id: userId });
            if (!foundUser) {
                return res.status(404).json({ error: "User with this ID not exist." });
            }
            const foundReport = yield toothReport_model_1.default.findOne({ user: userId });
            if (!foundReport) {
                return res.status(404).json({ error: "Tooth report for that user not exist." });
            }
            const newReport = Object.assign({}, req.body);
            toothReportService.update(newReport, foundReport._id);
            res.status(200).json({ msg: "Tooth Report Updated", data: newReport });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.updateReportByUserId = updateReportByUserId;
