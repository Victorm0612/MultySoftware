import { verifyAccess, verifyBelongsToUser, verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteSale, getOneSale, getSales, updateSale, getSalesDateRange } from '../controllers/sale_controller';

router.get('/', verifyToken, getSales);
router.get('/:id', verifyToken, getOneSale);
router.get('/dateRange/sales', verifyToken, getSalesDateRange)
router.post('/', verifyToken, create);
router.put('/:id', verifyAccess, updateSale);
router.delete('/:id', verifyAccess, deleteSale);

export default router;