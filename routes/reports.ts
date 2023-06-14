import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import * as reportController from "../controllers/report.controller";
import { verifyRoles } from "../middlewares/verifyRoles";
import { toothReportCustomValidation } from "../utils/validationHelper";

const toothReportRouter = Router();

// @route POST api/tooth-report
// @desc Create user tooth report
// @access private

toothReportRouter.post(
  "/",
  isAuthenticated,
  toothReportCustomValidation,
  reportController.createReport
);

// @route PUT api/tooth-report/me
// @desc Update authenticated user report
// @access private

toothReportRouter.put(
  "/",
  isAuthenticated,
  toothReportCustomValidation,
  reportController.updateMyReport
);

// @route PUT api/tooth-report/:reportId
// @desc Update  tooth report by report id
// @access private and only editor role

toothReportRouter.put(
  "/:reportId",
  isAuthenticated,
  verifyRoles(["Editor"]),
  toothReportCustomValidation,
  reportController.updateReportById
);

// @route PUT api/tooth-report/:userIdd
// @desc Update  tooth report by user id
// @access private and only editor role

toothReportRouter.put(
  "/update-user-report/:userId",
  isAuthenticated,
  verifyRoles(["Editor"]),
  toothReportCustomValidation,
  reportController.updateReportByUserId
);
export { toothReportRouter };
