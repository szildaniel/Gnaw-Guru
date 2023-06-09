import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users.model";
export async function getUsersList(req: Request, res: Response, next: NextFunction) {
  const allUsers = await UserModel.find({}).select("-password");
  return res.status(200).json({ data: allUsers });
}

export async function getAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req;

    const user = await UserModel.findById({ _id: userId }).select("-password").lean();
    if (!user) {
      return res.status(401).json({ error: "Authentication Failed." });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    return next(error);
  }
}

export function getUserById() {}
