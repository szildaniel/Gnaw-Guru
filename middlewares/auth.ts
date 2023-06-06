import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "config";
import UserModel from "../models/users.model";
import { generateJWT } from "../utils/auth";
import ms from "ms";
import createHttpError from "http-errors";

const dev = process.env.NODE_ENV === "development";
const refreshTokenLife: string = config.get("REFRESH_TOKEN_LIFE");
const refreshSecretKey: Secret = config.get("SECRET_REFRESH_KEY");
const accessTokenLife: string = config.get("ACCESS_TOKEN_LIFE");
const accessSecretKey: Secret = config.get("SECRET_ACCESS_KEY");

export interface IDecodedToken {
  _id: string;
  iat: number;
  exp: number;
}

export const generateAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const refreshToken = generateJWT(user._id.toString(), refreshSecretKey, refreshTokenLife);
      const accessToken = generateJWT(user._id.toString(), accessSecretKey, accessTokenLife);

      const token = {
        refreshToken,
        expirationTime: new Date(Date.now() + ms(refreshTokenLife)),
      };

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: user._id },
        { refreshToken: token }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: !dev,
        signed: true,
        expires: new Date(Date.now() + ms(refreshTokenLife)),
      });

      const expiresAt = new Date(Date.now() + ms(accessTokenLife));

      return res.status(200).json({
        user,
        token: accessToken,
        expiresAt,
      });
    } else {
      console.log("User does not exist");
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return next(error);
  }
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      const error = createHttpError.Unauthorized();
      throw error;
    }

    const { signedCookies = {} } = req;

    const { refreshToken } = signedCookies;

    if (!refreshToken) {
      const error = createHttpError.Unauthorized();
      throw error;
    }

    let decodedToken;

    try {
      decodedToken = <IDecodedToken>jwt.verify(token, accessSecretKey);
    } catch (err) {
      const error = createHttpError.Unauthorized();
      throw next(error);
    }

    const decodedId = decodedToken._id;
    const user = UserModel.find({ _id: decodedId });

    if (!user) {
      const error = createHttpError.Unauthorized();
      throw error;
    }
    next();
  } catch (error) {}
};
