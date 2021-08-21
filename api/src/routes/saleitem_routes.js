import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getSaleItems, getOneSaleItem, create, updateSaleItem, deleteSaleItem } from '../controllers/saleitem_controller'

router.get('/', getSaleitems);
router.get('/:id', getOneSaleItem);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updateSaleItem);
router.delete('/:id', verifyToken, deleteSaleItem);

export default router;