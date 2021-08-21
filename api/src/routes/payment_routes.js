import { verifyToken, verifyAccess, verifyBelongsToUser } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getPayments, getOnePayment, create, updatePayment, deletePayment} from '../controllers/payment_controller'

router.get('/', getPayments);
router.get('/:id', [verifyToken, verifyBelongsToUser], getOnePayment);
router.post('/', [verifyToken, verifyAccess], verifyToken, create);
router.put('/:id', [verifyToken, verifyAccess], verifyToken, updatePayment);
router.delete('/:id', [verifyToken, verifyAccess], verifyToken, deletePayment);

export default router;