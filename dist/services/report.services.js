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
exports.updateByUserId = exports.update = exports.create = void 0;
const toothReport_model_1 = __importDefault(require("../models/toothReport.model"));
function create(toothReport) {
    return __awaiter(this, void 0, void 0, function* () {
        const createReport = yield toothReport_model_1.default.create(toothReport);
    });
}
exports.create = create;
function update(toothReport, reportId) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateReport = yield toothReport_model_1.default.findOneAndUpdate({ _id: reportId }, toothReport);
    });
}
exports.update = update;
function updateByUserId(toothReport, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateReport = yield toothReport_model_1.default.findOneAndUpdate({ user: userId }, toothReport);
    });
}
exports.updateByUserId = updateByUserId;
