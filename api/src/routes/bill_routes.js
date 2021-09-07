import { verifyToken, verifyAccess, verifyBelongsToUser } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getBills, getOneBill, create, updateBill, deleteBill } from '../controllers/bill_controller'

router.get('/', verifyAccess, getBills);
router.get('/:id', verifyBelongsToUser, getOneBill);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updateBill);
router.delete('/:id', verifyAccess, deleteBill)

export default router;