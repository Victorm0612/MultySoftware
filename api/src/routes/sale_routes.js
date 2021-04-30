import { Router } from 'express';
const router = Router();

import { create, deleteSale, getOneSale, getSales, updateSale } from '../controllers/sale_controller';

router.get('/', getSales);
router.get('/:id', getOneSale);
router.post('/', create);
router.put('/:id', updateSale);
router.delete('/:id', deleteSale);

export default router;