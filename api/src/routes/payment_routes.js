import { verifyToken, verifyAccess, verifyBelongsToUser } from "../middlewares";
import { Router } from "express";
const router = Router();

import {
  getPayment,
  getOnePayment,
  create,
  updatePayment,
  deletePayment,
} from "../controllers/payment_controller";

router.get('/', verifyToken, getPayment);
router.get('/:id', verifyToken, getOnePayment);
router.post('/', verifyToken, create);
router.put('/:id', verifyAccess, updatePayment);
router.delete('/:id', verifyAccess, deletePayment);

export default router;
