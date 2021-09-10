import { verifyToken, verifyAccess } from "../middlewares";
import { Router } from "express";
const router = Router();

import {
  getRestaurants,
  getOneRestaurant,
  create,
  updateRestaurant,
  deleteRestaurant,
  mostSeller,
  lessSeller,
} from "../controllers/restaurant_controller";

router.get("/", getRestaurants);
router.get("/one/:id", getOneRestaurant);
router.post("/", verifyAccess, create);
router.put("/:id", verifyAccess, updateRestaurant);
router.delete("/:id", verifyAccess, deleteRestaurant);
router.get("/mostSeller/", mostSeller);
router.get("/lestSeller/", lessSeller);
export default router;
