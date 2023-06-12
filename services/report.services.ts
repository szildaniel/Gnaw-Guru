import ToothReportModel, { IToothReport } from "../models/toothReport.model";

export async function create(toothReport: IToothReport) {
  const createReport = await ToothReportModel.create(toothReport);
}

export async function update(toothReport: IToothReport, reportId: string) {
  const updateReport = await ToothReportModel.findOneAndUpdate({ _id: reportId }, toothReport);
}

export async function updateByUserId(toothReport: IToothReport, userId: string) {
  const updateReport = await ToothReportModel.findOneAndUpdate({ user: userId }, toothReport);
}
