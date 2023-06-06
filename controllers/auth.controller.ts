import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users.model";
import * as authServices from "../services/auth.services";
import { validationResult } from "express-validator";

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

export function refreshOne(req: Request, res: Response) {
  console.log("refresh token working");
  return res.sendStatus(200);
}

export function logoutOne(req: Request, res: Response) {
  console.log("logout route working");
  return res.sendStatus(200);
}
