import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users.model";
import * as authServices from "../services/auth.services";
import { validationResult } from "express-validator";
import { clearTokens, generateJWT } from "../utils/auth";
import config from "config";
import ms from "ms";
import createHttpError from "http-errors";
import jwt, { Secret } from "jsonwebtoken";

export interface IDecodedRefreshToken {
  userId: string;
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
  console.log("refresh token working");

  const secretRefreshKey: Secret = config.get("SECRET_REFRESH_KEY");
  const secretAccessKey: Secret = config.get("SECRET_ACCESS_KEY");
  const accessTokenLife: string = config.get("ACCESS_TOKEN_LIFE");

  const { signedCookies } = req;
  const { refreshToken } = signedCookies;
  console.log(refreshToken);
  if (!refreshToken) {
    return res.sendStatus(204);
  }

  try {
    const userWithRefreshToken = await UserModel.findOne({
      "refreshToken.refreshToken": refreshToken,
    });

    if (!userWithRefreshToken) {
      await clearTokens(req, res, next);
      const error = createHttpError.Unauthorized();
      throw error;
    }

    try {
      const decodedToken = <IDecodedRefreshToken>jwt.verify(refreshToken, secretRefreshKey);
      const decodedId = decodedToken.userId;
      const user = await UserModel.findOne({ _id: decodedId });

      if (!user) {
        console.log("there is no user");
        await clearTokens(req, res);
        const error = createHttpError(401, "Invalid credentials");
        throw error;
      }

      const accessToken = generateJWT(user.id, secretAccessKey, accessTokenLife);

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
