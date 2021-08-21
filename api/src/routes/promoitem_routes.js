import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getPromoItems, getOnePromoItem, create, updatePromoItem, deletePromoItem } from '../controllers/promoitem_controller'

router.get('/', getPromoItems);
router.get('/:id', getOnePromoItem);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updatePromoItem);
router.delete('/:id', verifyToken, deletePromoItem);

export default router;