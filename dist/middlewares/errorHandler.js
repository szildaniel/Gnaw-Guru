"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_model_1 = require("../models/customError.model");
function handleError(err, req, res, next) {
    let customError = err;
    if (!(err instanceof customError_model_1.CustomError)) {
        customError = new customError_model_1.CustomError("Server error: Houston, we have a problem.");
    }
    res.status(customError.status).send(customError);
}
exports.default = handleError;
