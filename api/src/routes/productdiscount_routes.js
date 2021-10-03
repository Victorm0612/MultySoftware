import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getProductDiscounts, getOneProductDiscount, create, updaupdateProductDiscount, deleteProductDiscount } from '../controllers/productdiscount_controller'

router.get('/', getProductDiscounts);
router.get('/:id', getOneProductDiscount);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updaupdateProductDiscount);
router.delete('/:id', verifyAccess, deleteProductDiscount);

export default router;