"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const config_1 = __importDefault(require("config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
const reports_1 = require("./routes/reports");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
(0, db_1.connectDB)();
const cookiesSecret = config_1.default.get("COOKIES_SECRET");
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(cookiesSecret));
const port = config_1.default.get("PORT");
app.get("/", (req, res) => {
    res.send("Express TypeScript here");
});
app.use("/api", auth_1.authRouter);
app.use("/api/users", users_1.userRouter);
app.use("/api/tooth-report", reports_1.toothReportRouter);
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
