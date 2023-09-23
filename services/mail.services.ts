import nodemailer from "nodemailer";
import Logging from "../library/Logging";
import  config  from "config";

export interface MailInterface {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}

const SMTPHost: any = config.get("SMTP_HOST");
const SMTPPort: number = config.get("SMTP_PORT");
const SMTPUsername: string = config.get("SMTP_USERNAME");
const SMTPPassword: string = config.get("SMTP_PASSWORD");

export default class MailService {
 

  private static instance: MailService;
  private transporter: nodemailer.Transporter;

  private constructor() {
    this.transporter =  nodemailer.createTransport({
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
  async createLocalConnection() {
    let account = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
  }
  //CREATE A CONNECTION FOR LIVE
  async createConnection() {
    this.transporter = nodemailer.createTransport({
      host: SMTPHost,
      port: SMTPPort,
      secure: false,
      auth: {
        user: SMTPUsername,
        pass: SMTPPassword,
      },
    });
  }
  //SEND MAIL
  async sendMail(requestId: string | undefined | string[], options: MailInterface) {
    return await this.transporter
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
        Logging.info(`${requestId} - Mail sent successfully!!`);
        Logging.info(
          `${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`
        );
        if (process.env.NODE_ENV === "local") {
          Logging.info(
            `${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(info)}`
          );
        }
        return info;
      });
  }
  //VERIFY CONNECTION
  async verifyConnection() {
    return this.transporter.verify();
  }
  //CREATE TRANSPORTER
  getTransporter() {
    return this.transporter;
  }
}
