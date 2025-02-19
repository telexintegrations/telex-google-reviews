import express, { Express, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import integrationRoutes from "@/routes/integration.routes";
import tickRoutes from "@/routes/tick.routes";

const app: Express = express();
app.use(morgan("dev"));

const allowedOrigins = [
  "https://telex.im",
  "https://staging.telex.im",
  "http://telextest.im",
  "http://staging.telextest.im",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/integration.json", integrationRoutes);
app.use("/api/v1/tick", tickRoutes);
app.get("/test", (_req: Request, res: Response) => {
  res.json({ message: "Test successful" });
});

export default app;
