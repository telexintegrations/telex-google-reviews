import { Request, Response } from "express";
import integration from "@/data/integration.json";

export const integrationController = (_req: Request, res: Response): void => {
  res.json({ ...integration });
};
