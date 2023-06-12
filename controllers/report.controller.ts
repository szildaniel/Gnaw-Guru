import { Request, Response, NextFunction } from "express";
import ToothReportModel from "../models/toothReport.model";
import { validationResult } from "express-validator";
import * as toothReportService from "../services/report.services";
import { IToothReport } from "../models/toothReport.model";
import UserModel from "../models/users.model";
import mongoose from "mongoose";

export async function createReport(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { userId } = req;
    const foundUserReport = await ToothReportModel.findOne({ user: userId });
    if (foundUserReport) {
      console.error("Tooth Report for this user already exist!");
      return res.status(400).json({ msg: "Tooth Report for this user already exist!" });
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ msg: "Can't find user from token!" });
    }

    const newReport: IToothReport = {
      user: user._id,
      ...req.body,
    };

    toothReportService.create(newReport);
    res.status(200).json({ msg: "ToothReport added correctly.", data: newReport });
  } catch (error) {
    return res.status(400).json({ msg: "Bad request!" });
  }
}

export async function updateMyReport(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  const { userId } = req;

  try {
    const userReport = await ToothReportModel.findOne({ user: userId });
    if (!userReport) {
      return res.status(422).json({ error: "There is no tooth report for that user." });
    }

    const newReport = { ...req.body };
    const updateUserReport = await toothReportService.updateByUserId(newReport, userId);
    return res.status(200).json({ msg: "User tooth report updated", data: newReport });
  } catch (error) {
    return res.status(400).json({ error: "Bad request." });
  }
}

export async function updateReportById(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  const { reportId } = req.params;
  try {
    const isValid = mongoose.Types.ObjectId.isValid(reportId);
    if (!isValid) {
      return res.status(422).json({ error: "Tooth report with this id not exist." });
    }
    const foundReport = await ToothReportModel.findOne({ _id: reportId });

    if (!foundReport) {
      return res.status(422).json({ error: "Tooth report with this id not exist." });
    }

    const newReport = { ...req.body };
    toothReportService.update(newReport, reportId);
    res.status(200).json({ msg: "Tooth Report Updated", data: newReport });
  } catch (error) {
    return res.status(400).json({ error: "Bad request." });
  }
}

export async function updateReportByUserId(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  const { userId } = req.params;

  try {
    const isValid = mongoose.Types.ObjectId.isValid(userId);

    if (!isValid) {
      return res.status(422).json({ error: "Tooth report for that user not exist. noot valid" });
    }
    const foundReport = await ToothReportModel.findOne({ user: userId });

    if (!foundReport) {
      return res.status(422).json({ error: "Tooth report for that user not exist." });
    }

    const newReport = { ...req.body };
    toothReportService.update(newReport, foundReport._id);

    res.status(200).json({ msg: "Tooth Report Updated", data: newReport });
  } catch (error) {}
}
