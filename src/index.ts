import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import integrationRoutes from "@/routes/integration.routes";

const app: Express = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/v1/integration.json", integrationRoutes);

app.get("/test", (_req: Request, res: Response) => {
  res.json({ message: "Test successful" });
});

export default app;
