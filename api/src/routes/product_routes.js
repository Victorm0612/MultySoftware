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
  updateAllProductsIva,
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
router.post("/actualizarIva/", verifyAccess, updateAllProductsIva)
router.get("/mas_vendidos/", verifyAccess, getTop20);
router.get("/menos_vendidos", verifyAccess, getBottom20);
router.post("/ultimos6Meses/:id", verifyAccess, last6Months);

export default router;
