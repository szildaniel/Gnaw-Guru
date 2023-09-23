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
const nodemailer_1 = __importDefault(require("nodemailer"));
const Logging_1 = __importDefault(require("../library/Logging"));
const config_1 = __importDefault(require("config"));
const SMTPHost = config_1.default.get("SMTP_HOST");
const SMTPPort = config_1.default.get("SMTP_PORT");
const SMTPUsername = config_1.default.get("SMTP_USERNAME");
const SMTPPassword = config_1.default.get("SMTP_PASSWORD");
class MailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: SMTPHost,
            port: SMTPPort,
            secure: false,
            auth: {
                user: SMTPUsername,
                pass: SMTPPassword,
            },
        });
    }
    //INSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    //CREATE CONNECTION FOR LOCAL
    createLocalConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            let account = yield nodemailer_1.default.createTestAccount();
            this.transporter = nodemailer_1.default.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });
        });
    }
    //CREATE A CONNECTION FOR LIVE
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.transporter = nodemailer_1.default.createTransport({
                host: SMTPHost,
                port: SMTPPort,
                secure: false,
                auth: {
                    user: SMTPUsername,
                    pass: SMTPPassword,
                },
            });
        });
    }
    //SEND MAIL
    sendMail(requestId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transporter
                .sendMail({
                from: `"GnawGuru" ${process.env.SMTP_SENDER || options.from}`,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
            })
                .then((info) => {
                Logging_1.default.info(`${requestId} - Mail sent successfully!!`);
                Logging_1.default.info(`${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`);
                if (process.env.NODE_ENV === "local") {
                    Logging_1.default.info(`${requestId} - Nodemailer ethereal URL: ${nodemailer_1.default.getTestMessageUrl(info)}`);
                }
                return info;
            });
        });
    }
    //VERIFY CONNECTION
    verifyConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.transporter.verify();
        });
    }
    //CREATE TRANSPORTER
    getTransporter() {
        return this.transporter;
    }
}
exports.default = MailService;
