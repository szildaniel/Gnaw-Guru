import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users.model";
import mongoose from "mongoose";

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

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      return res.status(401).json({ error: "Authentication Failed." });
    }

    const user = await UserModel.findById({ _id: id }).select("-password").lean();
    if (!user) {
      return res.status(401).json({ error: "Authentication Failed." });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    return next(error);
  }
}

export async function getDoctors(req: Request, res: Response, next: NextFunction) {
  try {
    const doctors = await UserModel.find({ roles: 1984 });
    if (!doctors) {
      return res.status(400).json({ msg: "Can't find doctors!" });
    }
    return res.status(200).json({ data: doctors });
  } catch (error) {
    return next(error);
  }
}
