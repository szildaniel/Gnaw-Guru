import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { check } from "express-validator";
import { generateAuthToken } from "../middlewares/auth";
const authRouter = Router();

// @route POST api/register
// @desc Register  User
// @access pubic
authRouter.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters and less than 20 characters."
    ).isLength({
      min: 6,
      max: 20,
    }),
  ],
  authController.registerOne,
  generateAuthToken
);

// @route POST api/login
// @desc Login User
// @access pubic
authRouter.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters and less than 20 characters."
    ).isLength({
      min: 6,
      max: 20,
    }),
  ],
  authController.loginOne,
  generateAuthToken
);

// @route POST api/reset-password-request
// @desc Request reset user password
// @access public
authRouter.post(
  "/reset-password-request",
  [check("email", "Please include a valid email").isEmail()],
  generateAuthToken,
  authController.resetPasswordRequest,
);

// @route POST api/refresh
// @desc Refresh auth token User
// @access private
authRouter.post("/refresh", authController.refreshOne);

// @route POST api/logout
// @desc Logout User
// @access private
authRouter.post("/logout", authController.logoutOne);

export { authRouter };
