import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getPromoItems, getOnePromoItem, create, updatePromoItem, deletePromoItem } from '../controllers/productdiscount_controller'

router.get('/', getPromoItems);
router.get('/:id', getOnePromoItem);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updatePromoItem);
router.delete('/:id', verifyAccess, deletePromoItem);

export default router;