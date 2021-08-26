import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getPromoItems, getOnePromoItem, create, updatePromoItem, deletePromoItem } from '../controllers/promoitem_controller'

router.get('/', verifyToken, getPromoItems);
router.get('/:id', verifyToken, getOnePromoItem);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updatePromoItem);
router.delete('/:id', [verifyToken, verifyAccess], deletePromoItem);

export default router;