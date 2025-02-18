import { Router } from "express";
import { tickController } from "@/controllers/tick.controller";

const router = Router();

router.post("/", tickController);

export default router;
