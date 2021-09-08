import { Router } from "express";
import { verifyTokenIsValid } from "../middlewares";
const router = Router();

import { signUp, signIn } from "../controllers/auth_controller";

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/verifyToken", verifyTokenIsValid);

export default router;
