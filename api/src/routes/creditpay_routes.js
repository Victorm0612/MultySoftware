import { verifyAccess, verifyBelongsToUser } from "../middlewares";
import { Router } from "express";
const router = Router();

import {
  create,
  deleteCredit_Pay,
  getOneCredit_Pay,
  getCreditPays,
  updateCredit_Pay,
} from "../controllers/credit_paycontroller";

router.get("/", verifyAccess, getCreditPays);
router.get("/:id", verifyBelongsToUser, getOneCredit_Pay);
router.post("/", create);
router.put("/:id", verifyAccess, updateCredit_Pay);
router.delete("/:id", verifyAccess, deleteCredit_Pay);

export default router;
