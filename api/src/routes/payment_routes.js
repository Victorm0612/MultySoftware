import { Router } from 'express';
const router = Router();

import { } from '../controllers/payment_controller'

router.get('/', getPayments);
router.get('/:id', getOnePayment);
router.post('/', create);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

export default router;