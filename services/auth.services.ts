import { NextFunction, Request, Response } from "express";
import UserModel, { IUser } from "../models/users.model";
import bcrypt from "bcrypt";

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
  } catch (error) {}
}
