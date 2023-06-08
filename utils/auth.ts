import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/users.model";

const dev = process.env.NODE_ENV === "development";
export const generateJWT = (
  userId: string,
  secret: Secret,
  expirationTime: string,

  roles?: number[]
) => {
  return jwt.sign(
    {
      userId,
      roles,
    },
    secret,
    { expiresIn: expirationTime }
  );
};

export const clearTokens = async (req: Request, res: Response, next?: NextFunction) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    const user = await UserModel.findOneAndUpdate(
      {
        "refreshToken.refreshToken": refreshToken,
      },
      { $unset: { refreshToken: 1 } }
    );
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    // secure: !dev,
    secure: false,
    signed: true,
  });
};
