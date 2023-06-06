import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/db";
import config from "config";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";

const app: Express = express();
connectDB();
const cookiesSecret: string = config.get("COOKIES_SECRET");
app.use(express.json());
app.use(cookieParser(cookiesSecret));
const port: string = config.get("PORT");

app.get("/", (req: Request, res: Response) => {
  res.send("Express TypeScript here");
});
app.use("/api", authRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
