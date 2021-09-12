import { Router } from "express";
import { verifyToken, verifyAccess } from "../middlewares";
const router = Router();

import {
  create,
  deleteProduct,
  getOneProduct,
  getProducts,
  getProductsByName,
  updateProduct,
  getTop20,
  getBottom20,
  last6Months,
} from "../controllers/product_controller";

router.get("/", getProducts);
router.get("/un_producto", getProductsByName);
router.get("/one/:id", getOneProduct);
router.post("/", verifyAccess, create);
router.put("/:id", verifyAccess, updateProduct);
router.delete("/:id", verifyAccess, deleteProduct);
router.get("/mas_vendidos/", getTop20);
router.get("/menos_vendidos", getBottom20);
router.get("/ultimos6Meses/:id", last6Months);

export default router;
