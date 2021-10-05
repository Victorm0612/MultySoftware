import { Router } from "express";
const router = Router();

import { processMessage } from "../controllers/bot_controller";

router.post("/", processMessage);

export default router;
