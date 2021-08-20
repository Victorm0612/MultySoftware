import { Router } from 'express';
const router = Router();

import { getSaleItems, getOneSaleItem, create, updateSaleItem, deleteSaleItem } from '../controllers/saleitem_controller'

router.get('/', getSaleitems);
router.get('/:id', getOneSaleItem);
router.post('/', create);
router.put('/:id', updateSaleItem);
router.delete('/:id', deleteSaleItem);

export default router;