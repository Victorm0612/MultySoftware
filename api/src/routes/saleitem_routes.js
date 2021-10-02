import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getSaleItems, getOneSaleItem, create, updateSaleItem, deleteSaleItem } from '../controllers/saleitem_controller'

router.get('/', verifyToken, getSaleItems);
router.get('/:id',  verifyToken, getOneSaleItem);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updateSaleItem);
router.delete('/:id', verifyAccess, deleteSaleItem);

export default router;