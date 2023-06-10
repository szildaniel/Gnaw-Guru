import mongoose, { Schema, Document } from "mongoose";

type TToothCondition = "healthy" | "caries" | "filling" | "chipped" | "missing";

interface IToothTypes extends Document {
  centralIncisor: TToothCondition;
  lateralIncisor: TToothCondition;
  canine: TToothCondition;
  firstPremolar: TToothCondition;
  secondPremolar: TToothCondition;
  firstMolar: TToothCondition;
  secondMolar: TToothCondition;
  wisdomTooth: TToothCondition;
}

interface IUpperJaw extends Document {
  leftSide: IToothTypes;
  rightSide: IToothTypes;
}

interface ILowerJaw extends Document {
  leftSide: IToothTypes;
  rightSide: IToothTypes;
}

export interface IToothReport extends Document {
  user: {
    type: Schema.Types.ObjectId;
    ref: "users";
  };
  upperJaw: IUpperJaw;
  lowerJaw: ILowerJaw;
}

const ToothReportSchema: mongoose.Schema<IToothReport> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  upperJaw: {
    leftSide: {
      centralIncisor: { type: String, required: true },
      lateralIncisor: { type: String, required: true },
      canine: { type: String, required: true },
      firstPremolar: { type: String, required: true },
      secondPremolar: { type: String, required: true },
      firstMolar: { type: String, required: true },
      secondMolar: { type: String, required: true },
      wisdomTooth: { type: String, required: true },
    },
    rightSide: {
      centralIncisor: { type: String, required: true },
      lateralIncisor: { type: String, required: true },
      canine: { type: String, required: true },
      firstPremolar: { type: String, required: true },
      secondPremolar: { type: String, required: true },
      firstMolar: { type: String, required: true },
      secondMolar: { type: String, required: true },
      wisdomTooth: { type: String, required: true },
    },
  },
  lowerJaw: {
    leftSide: {
      centralIncisor: { type: String, required: true },
      lateralIncisor: { type: String, required: true },
      canine: { type: String, required: true },
      firstPremolar: { type: String, required: true },
      secondPremolar: { type: String, required: true },
      firstMolar: { type: String, required: true },
      secondMolar: { type: String, required: true },
      wisdomTooth: { type: String, required: true },
    },
    rightSide: {
      centralIncisor: { type: String, required: true },
      lateralIncisor: { type: String, required: true },
      canine: { type: String, required: true },
      firstPremolar: { type: String, required: true },
      secondPremolar: { type: String, required: true },
      firstMolar: { type: String, required: true },
      secondMolar: { type: String, required: true },
      wisdomTooth: { type: String, required: true },
    },
  },
});

const ToothReportModel = mongoose.model<IToothReport>("ToothReport", ToothReportSchema);

export default ToothReportModel;
