import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import * as userController from "../controllers/user.controller";

const userRouter = Router();

// @route GET api/users/list
// @desc Get list of users
// @access private

userRouter.post("/list", isAuthenticated, userController.getUsersList);

// @route POST api/users/login
// @desc Get authenticated user
// @access pubic

userRouter.post("/me", isAuthenticated, userController.getAuthenticatedUser);

// @route POST api/users/refresh
// @desc Get user by id
// @access private

userRouter.post("/:id", isAuthenticated, userController.getUserById);

export { userRouter };
