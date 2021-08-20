import { Router } from 'express';
const router = Router();

import { getBills, getOneBill, create, updateBill, deleteBill } from '../controllers/bill_controllerl'

router.get('/', getBills);
router.get('/:id', getOneBill);
router.post('/', create);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill)

export default router;