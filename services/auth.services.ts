import { NextFunction, Request, Response } from "express";
import UserModel, { IUser } from "../models/users.model";
import bcrypt from "bcrypt";
import { TEmaiLData } from "../types/TEmailData";
import MailService from "./mail.services";
import resetPasswordTemplate from "../templates/resetPwConfirmation";
import resetPasswordConfirmation from "../templates/resetPwConfirmation";

export async function register(user: IUser, next: NextFunction) {
  const createUser = await UserModel.create(user);
  next();
}

export async function login(user: IUser, req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = req.body;
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      next();
    } else {
      return res.status(422).json({ error: "Login error: Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
}
export async function sendEmail(
  mailData: TEmaiLData,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { emailAddress, emailTemplate } = mailData;
  try {
    const mailService = MailService.getInstance();
    await mailService.sendMail(req.headers["X-Request-Id"], {
      to: emailAddress,
      from: "admin@gnawguru.com",
      subject: "GnawGuru - Reset password",
      html: emailTemplate.html,
    });

    return res
      .status(200)
      .json({ msg: "Success! Check your email inbox and click reset password link!" });
  } catch (error) {
    return next(error);
  }
}

export async function resetPassword(user: IUser, req: Request, res: Response, next: NextFunction) {
  try {
    user.password = req.body.newPassword;
    user.save();
    const mailTemplate = resetPasswordConfirmation(user.name);
    const mailService = MailService.getInstance();
    await mailService.sendMail(req.headers["X-Request-Id"], {
      to: user.email,
      from: "admin@gnawguru.com",
      subject: "GnawGuru - Password changed",
      html: mailTemplate.html,
    });

    return res.status(200).json({ msg: "Your password has been changed successfully." });
  } catch (error) {
    next(error);
  }
}
