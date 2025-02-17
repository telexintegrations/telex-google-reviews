import { integrationController } from "@/controllers/integration.controller";
import { Router } from "express";

const router = Router();

router.get("/", integrationController);

export default router;
