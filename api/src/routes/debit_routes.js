import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getDebits, getOneDebit, create, updateDebit, deleteDebit } from '../controllers/debit_controller'

router.get('/', getDebits);
router.get('/:id', getOneDebit);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updateDebit);
router.delete('/:id', verifyToken, deleteDebit);

export default router;