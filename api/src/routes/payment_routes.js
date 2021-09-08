import { verifyToken, verifyAccess, verifyBelongsToUser } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getPayment, getOnePayment, create, updatePayment, deletePayment} from '../controllers/payment_controller'

router.get('/', verifyAccess, getPayment);
router.get('/:id', verifyBelongsToUser, getOnePayment);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updatePayment);
router.delete('/:id', verifyAccess, deletePayment);

export default router;