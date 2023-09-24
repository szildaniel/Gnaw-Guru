import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users.model";
import * as authServices from "../services/auth.services";
import { validationResult } from "express-validator";
import { clearTokens, generateJWT } from "../utils/auth";
import config from "config";
import ms from "ms";
import jwt, { Secret } from "jsonwebtoken";
import { CustomError } from "../models/customError.model";
import resetPasswordTemplate from "../templates/resetPassword";
import { TEmaiLData } from "../types/TEmailData";
import { IDecodedToken2 } from "../middlewares/auth";
import bcrypt from "bcrypt";
import { saltRounds } from "../models/users.model";
;
export interface IDecodedRefreshToken {
  userId: string;
  roles: number[];
  iat: number;
  exp: number;
}

export async function registerOne(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const { email } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(422).json({
        error: "Username or email already exists",
      });
    }
    let newUser = { ...req.body };
    newUser = { ...newUser, roles: [2001] };
   
    const registerUser = await authServices.register(newUser, next);
  } catch (error) {
    console.log("Server error!");
    return res.sendStatus(500);
  }
}

export async function resetPasswordRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const { email }: { email: string } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(422).json({ error: "Invalid credentials." });
    } else {
      const clientURL: string = config.get("CLIENT_URL");
      const link = `${clientURL}/reset-password/?token=${req.accessToken}&userId=${user._id}`;
      const emailTemplate = resetPasswordTemplate(link, user.name);

      const mailData: TEmaiLData = {
        emailAddress: email,
        emailTemplate: emailTemplate,
      };
       await authServices.sendEmail(mailData, req, res, next)
    }
  } catch (error) {
    console.log("Server error!", error);
    return res.sendStatus(500);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  try {
    const { userId, token } = req.body;
    const accessSecretKey: Secret = config.get("SECRET_ACCESS_KEY");

    if (!token) {
      throw new CustomError("Not authorized.", 401);
    }

    let decodedToken;

    try {
      decodedToken = <IDecodedToken2>jwt.verify(token, accessSecretKey);
    } catch (err) {
      throw new CustomError("Not authorized or your reset password link is deprecated.", 401);
    }
    const decodedTokenUserId = decodedToken.userId;
    if (userId !== decodedTokenUserId) {
      throw new CustomError("Not authorized.", 401);
    }

    const user = await UserModel.findOne({ _id: decodedTokenUserId });
    if (!user) {
      throw new CustomError("Not authorized.", 401);
    } else {
     const updatePassword = await authServices.resetPassword(user, req, res, next);
    }

  
  } catch (error) {
    next(error);
  }
}

export async function loginOne(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(422).json({ error: "Login error: Invalid credentials" });
    } else {
      await authServices.login(user, req, res, next);
    }
  } catch (error) {
    console.log("Server error! Can't login!");
    return res.sendStatus(500);
  }
}

export async function refreshOne(req: Request, res: Response, next: NextFunction) {
  const secretRefreshKey: Secret = config.get("SECRET_REFRESH_KEY");
  const secretAccessKey: Secret = config.get("SECRET_ACCESS_KEY");
  const accessTokenLife: string = config.get("ACCESS_TOKEN_LIFE");

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(204);
  }

  try {
    const userWithRefreshToken = await UserModel.findOne({
      "refreshToken.refreshToken": refreshToken,
    });
    if (!userWithRefreshToken) {
      await clearTokens(req, res, next);

      throw new CustomError("No authorized.", 401);
    }

    try {
      const decodedToken = <IDecodedRefreshToken>jwt.verify(refreshToken, secretRefreshKey);
      const decodedId = decodedToken.userId;
      const user = await UserModel.findOne({ _id: decodedId });

      if (!user) {
        await clearTokens(req, res);
        throw new CustomError("Not found user with that token.", 404);
      }

      const accessToken = generateJWT(user.id, secretAccessKey, accessTokenLife, user.roles);

      res.status(200).json({
        user,
        accessToken,
        expiresAt: new Date(Date.now() + ms(accessTokenLife)),
      });
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
}

export async function logoutOne(req: Request, res: Response) {
  console.log("logout route working");

  await clearTokens(req, res);
  return res.sendStatus(204);
}
