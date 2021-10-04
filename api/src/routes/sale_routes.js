import { verifyAccess, verifyBelongsToUser } from "../middlewares";
import { Router } from "express";
const router = Router();

import {
  create,
  deleteSale,
  getOneSale,
  getSales,
  updateSale,
  getSalesDateRange,
} from "../controllers/sale_controller";

router.get("/", verifyAccess, getSales);
router.get("/:id", verifyAccess, getOneSale);
router.post("/dateRange/sales", verifyAccess, getSalesDateRange);
router.post("/", create);
router.put("/:id", verifyAccess, updateSale);
router.delete("/:id", verifyAccess, deleteSale);

export default router;
