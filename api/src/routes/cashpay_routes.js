import { verifyAccess, verifyTokenIsValid, verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteCash_Pay, getOneCash_Pay, getCashPays, updateCash_Pay } from '../controllers/cash_paycontroller';

router.get('/', verifyTokenIsValid, getCashPays);
router.get('/:id', verifyTokenIsValid, getOneCash_Pay);
router.post('/', verifyTokenIsValid, create);
router.put('/:id', verifyAccess, updateCash_Pay);
router.delete('/:id', verifyAccess, deleteCash_Pay);

export default router;