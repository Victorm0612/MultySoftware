import { Router } from 'express';
const router = Router();

import { getPromoItems, getOnePromoItem, create, updatePromoItem, deletePromoItem } from '../controllers/promoitem_controller'

router.get('/', getPromoItems);
router.get('/:id', getOnePromoItem);
router.post('/', create);
router.put('/:id', updatePromoItem);
router.delete('/:id', deletePromoItem);

export default router;