import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getPayments, getOnePayment, create, updatePayment, deletePayment} from '../controllers/payment_controller'

router.get('/', getPayments);
router.get('/:id', getOnePayment);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updatePayment);
router.delete('/:id', verifyToken, deletePayment);

export default router;