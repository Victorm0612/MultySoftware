import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getBills, getOneBill, create, updateBill, deleteBill } from '../controllers/bill_controllerl'

router.get('/', [verifyToken, verifyAccess], getBills);
router.get('/:id', [verifyToken, verifyAccess], getOneBill);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateBill);
router.delete('/:id', [verifyToken, verifyAccess], deleteBill)

export default router;