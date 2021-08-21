import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteDiscount, getOneDiscount, getDiscounts, updateDiscount } from '../controllers/discount_controller'

router.get('/', verifyToken, getDiscounts);
router.get('/:id', verifyToken, getOneDiscount);
router.post('/', [verifyToken, verifyAccess], create),
router.put('/:id', [verifyToken, verifyAccess], updateDiscount);
router.delete('/:id', [verifyToken, verifyAccess], deleteDiscount);

export default router;