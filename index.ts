import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/db";
import config from "config";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { toothReportRouter } from "./routes/reports";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
const app: Express = express();

declare global {
  namespace Express {
    interface Request extends Document {
      userId: string;
      accessToken?: string;
      roles: number[];
    }
  }
}

connectDB();
const cookiesSecret: string = config.get("COOKIES_SECRET");
app.use(express.json());
app.use(cookieParser(cookiesSecret));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const port: string = config.get("PORT");

app.get("/", (req: Request, res: Response) => {
  res.send("Express TypeScript here");
});
app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tooth-report", toothReportRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
