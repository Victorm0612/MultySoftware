import { Router } from 'express';
const router = Router();

import { create, deleteDiscount, getOneDiscount, getDiscounts, updateDiscount } from '../controllers/discount_controller'

router.get('/', getDiscounts);
router.get('/:id', getOneDiscount);
router.post('/', create),
router.put('/:id', updateDiscount);
router.delete('/:id', deleteDiscount);

export default router;