import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteSale, getOneSale, getSales, updateSale } from '../controllers/sale_controller';

router.get('/', verifyAccess, getSales);
router.get('/:id', verifyAccess, getOneSale);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updateSale);
router.delete('/:id', verifyAccess, deleteSale);

export default router;