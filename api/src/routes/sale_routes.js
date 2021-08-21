import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteSale, getOneSale, getSales, updateSale } from '../controllers/sale_controller';

router.get('/', getSales);
router.get('/:id', getOneSale);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updateSale);
router.delete('/:id', verifyToken, deleteSale);

export default router;