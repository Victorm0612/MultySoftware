import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteDiscount, getOneDiscount, getDiscounts, updateDiscount } from '../controllers/discount_controller'

router.get('/', getDiscounts);
router.get('/:id', getOneDiscount);
router.post('/', verifyAccess, create),
router.put('/:id', verifyAccess, updateDiscount);
router.delete('/:id', verifyAccess, deleteDiscount);

export default router;