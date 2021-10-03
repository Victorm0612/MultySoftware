import { verifyToken, verifyAccess, verifyTokenIsValid } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getPayment, getOnePayment, create, updatePayment, deletePayment} from '../controllers/payment_controller'

router.get('/', verifyTokenIsValid, getPayment);
router.get('/:id', verifyTokenIsValid, getOnePayment);
router.post('/', verifyTokenIsValid, create);
router.put('/:id', verifyAccess, updatePayment);
router.delete('/:id', verifyAccess, deletePayment);

export default router;