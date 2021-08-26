import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteSale, getOneSale, getSales, updateSale } from '../controllers/sale_controller';

router.get('/', [verifyToken, verifyAccess], getSales);
router.get('/:id', [verifyToken, verifyAccess], getOneSale);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateSale);
router.delete('/:id', [verifyToken, verifyAccess], deleteSale);

export default router;