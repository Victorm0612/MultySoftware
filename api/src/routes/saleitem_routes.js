import { verifyToken, verifyAccess } from "../middlewares";
import { Router } from "express";
const router = Router();

import {
  getSaleItems,
  getOneSaleItem,
  create,
  updateSaleItem,
  deleteSaleItem,
} from "../controllers/saleitem_controller";

router.get("/", verifyAccess, getSaleItems);
router.get("/:id", verifyAccess, getOneSaleItem);
router.post("/", create);
router.put("/:id", verifyAccess, updateSaleItem);
router.delete("/:id", verifyAccess, deleteSaleItem);


export default router;
