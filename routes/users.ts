import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import * as userController from "../controllers/user.controller";
import { verifyRoles } from "../middlewares/verifyRoles";

const userRouter = Router();

// @route GET api/users/list
// @desc Get list of users
// @access private

userRouter.get("/list", isAuthenticated, userController.getUsersList);

// @route GET api/users/me
// @desc Get authenticated user
// @access private

userRouter.get("/me", isAuthenticated, userController.getAuthenticatedUser);

// @route GET api/users/doctors
// @desc Get user by id
// @access private

userRouter.get("/doctors", isAuthenticated, userController.getDoctors);

// @route GET api/users/:id
// @desc Get user by id
// @access private

userRouter.get("/:id", isAuthenticated, userController.getUserById);

export { userRouter };
