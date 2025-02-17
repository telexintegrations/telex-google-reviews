import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app: Express = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/test", (_req: Request, res: Response) => {
  res.json({ message: "Test successful" });
});

export default app;
