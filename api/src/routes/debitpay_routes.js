import { verifyAccess, verifyBelongsToUser } from "../middlewares";
import { Router } from "express";
const router = Router();

import {
  create,
  deleteDebit_Pay,
  getOneDebit_Pay,
  getDebitPays,
  updateDebit_Pay,
} from "../controllers/debit_paycontroller";

router.get("/", verifyAccess, getDebitPays);
router.get("/:id", verifyBelongsToUser, getOneDebit_Pay);
router.post("/", create);
router.put("/:id", verifyAccess, updateDebit_Pay);
router.delete("/:id", verifyAccess, deleteDebit_Pay);

export default router;
