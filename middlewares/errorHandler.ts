import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/customError.model";

function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError("Server error: Houston, we have a problem.");
  }

  res.status((customError as CustomError).status).send(customError);
}

export default handleError;
