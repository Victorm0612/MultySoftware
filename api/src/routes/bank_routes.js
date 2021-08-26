import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getBanks, getOneBank, create, updateBank, deleteBank } from '../controllers/bank_controller'

router.get('/', verifyToken, getBanks);
router.get('/:id', verifyToken, getOneBank);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateBank);
router.delete('/:id', [verifyToken, verifyAccess], deleteBank)

export default router;