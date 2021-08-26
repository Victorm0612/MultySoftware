import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getSaleItems, getOneSaleItem, create, updateSaleItem, deleteSaleItem } from '../controllers/saleitem_controller'

router.get('/', [verifyToken, verifyAccess], getSaleItems);
router.get('/:id', [verifyToken, verifyAccess], getOneSaleItem);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateSaleItem);
router.delete('/:id', [verifyToken, verifyAccess], deleteSaleItem);

export default router;