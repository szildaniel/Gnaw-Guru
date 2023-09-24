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
exports.resetPassword = exports.sendEmail = exports.login = exports.register = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mail_services_1 = __importDefault(require("./mail.services"));
const resetPwConfirmation_1 = __importDefault(require("../templates/resetPwConfirmation"));
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
                return res.status(422).json({ error: "Login error: Invalid credentials" });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.login = login;
function sendEmail(mailData, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { emailAddress, emailTemplate } = mailData;
        try {
            const mailService = mail_services_1.default.getInstance();
            yield mailService.sendMail(req.headers["X-Request-Id"], {
                to: emailAddress,
                from: "admin@gnawguru.com",
                subject: "GnawGuru - Reset password",
                html: emailTemplate.html,
            });
            return res
                .status(200)
                .json({ msg: "Success! Check your email inbox and click reset password link!" });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.sendEmail = sendEmail;
function resetPassword(user, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            user.password = req.body.newPassword;
            user.save();
            const mailTemplate = (0, resetPwConfirmation_1.default)(user.name);
            const mailService = mail_services_1.default.getInstance();
            yield mailService.sendMail(req.headers["X-Request-Id"], {
                to: user.email,
                from: "admin@gnawguru.com",
                subject: "GnawGuru - Password changed",
                html: mailTemplate.html,
            });
            return res.status(200).json({ msg: "Your password has been changed successfully." });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.resetPassword = resetPassword;
