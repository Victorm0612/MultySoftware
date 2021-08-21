import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteDiscount, getOneDiscount, getDiscounts, updateDiscount } from '../controllers/discount_controller'

router.get('/', getDiscounts);
router.get('/:id', getOneDiscount);
router.post('/', verifyToken, create),
router.put('/:id', verifyToken, updateDiscount);
router.delete('/:id', verifyToken, deleteDiscount);

export default router;