import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getBills, getOneBill, create, updateBill, deleteBill } from '../controllers/bill_controllerl'

router.get('/', getBills);
router.get('/:id', getOneBill);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updateBill);
router.delete('/:id', verifyToken, deleteBill)

export default router;