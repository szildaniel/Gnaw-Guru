import jwt, { Secret } from "jsonwebtoken";
import { Request, Response } from "express";

const dev = process.env.NODE_ENV === "development";
export const generateJWT = (userId: string, secret: Secret, expirationTime: string) => {
  return jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: expirationTime }
  );
};

// const clearTokens = async (req: Request, res: Response) => {
//   const { signedCookies = {} } = req;
//   const { refreshToken } = signedCookies;
//   if (refreshToken) {
//     const index = tokens.findIndex((token) => token.refreshToken === refreshToken);
//     if (index) {
//       tokens.splice(index, 1);
//     }
//   }
//   res.clearCookie("refreshToken", {
//     httpOnly: true,
//     secure: !dev,
//     signed: true,
//   });
// };
