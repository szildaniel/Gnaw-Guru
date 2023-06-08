import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users.model";

export async function getUsersList(req: Request, res: Response, next: NextFunction) {
  const allUsers = await UserModel.find({}).select("-password");
  return res.status(200).json({ data: allUsers });
}

export function getAuthenticatedUser() {}

export function getUserById() {}
