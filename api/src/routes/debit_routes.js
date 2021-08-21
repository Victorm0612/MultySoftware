import { verifyToken, verifyAccess, verifyBelongsToUser } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getDebits, getOneDebit, create, updateDebit, deleteDebit } from '../controllers/debit_controller'

router.get('/', [verifyToken, verifyAccess], getDebits);
router.get('/:id', [verifyToken, verifyBelongsToUser], getOneDebit);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateDebit);
router.delete('/:id', [verifyToken, verifyAccess], deleteDebit);

export default router;