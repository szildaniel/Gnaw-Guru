import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "config";
import UserModel from "../models/users.model";
import { generateJWT } from "../utils/auth";
import ms from "ms";
import { CustomError } from "../models/customError.model";

const dev = process.env.NODE_ENV === "development";
const refreshTokenLife: string = config.get("REFRESH_TOKEN_LIFE");
const refreshSecretKey: Secret = config.get("SECRET_REFRESH_KEY");
const accessTokenLife: string = config.get("ACCESS_TOKEN_LIFE");
const resetPwAccessTokenLife: string = config.get("RESET_PW_TOKEN_LIFE");
const accessSecretKey: Secret = config.get("SECRET_ACCESS_KEY");

export interface IDecodedToken {
  _id: string;
  roles: number[];
  iat: number;
  exp: number;
}

export interface IDecodedToken2 {
  userId: string;
  roles: number[];
  iat: number;
  exp: number;
}

export const generateAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, resetPwRequest } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const refreshToken = generateJWT(user._id.toString(), refreshSecretKey, refreshTokenLife);
      const accessToken = generateJWT(
        user._id.toString(),
        accessSecretKey,
        resetPwRequest ? resetPwAccessTokenLife : accessTokenLife,
        user.roles
      );

      const token = {
        refreshToken,
        expirationTime: new Date(Date.now() + ms(refreshTokenLife)),
      };
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: user._id },
        { refreshToken: token }
      );

      const expiresAt = new Date(Date.now() + ms(accessTokenLife));

      if (resetPwRequest) {
        req.accessToken = accessToken;
        return next();
      }
      return res.status(200).json({
        name: user.name,
        expiresAt,
        accessToken: accessToken,
        refreshToken: token,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return next(error);
  }
};

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const isAuthenticated: MiddlewareFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      throw new CustomError("Not authorized.", 401);
    }

    let decodedToken;

    try {
      decodedToken = <IDecodedToken2>jwt.verify(accessToken, accessSecretKey);
    } catch (err) {
      throw new CustomError("Not authorized.", 401);
    }

    const decodedId = decodedToken.userId;
    const user = await UserModel.findOne({ _id: decodedId });
    if (!user) {
      throw new CustomError("Not authorized.", 401);
    }
    req.userId = user._id.toString();
    req.roles = user.roles;
    return next();
  } catch (error) {
    next(error);
  }
};
