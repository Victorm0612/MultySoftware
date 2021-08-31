import { verifyToken, verifyAccess, verifyBelongsToUser } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getDebits, getOneDebit, create, updateDebit, deleteDebit } from '../controllers/debit_controller'

router.get('/', verifyAccess, getDebits);
router.get('/:id', verifyBelongsToUser, getOneDebit);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updateDebit);
router.delete('/:id', verifyAccess, deleteDebit);

export default router;