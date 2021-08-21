import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getBanks, getOneBank, create, updateBank, deleteBank } from '../controllers/bank_controller'

router.get('/', getBanks);
router.get('/:id', getOneBank);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updateBank);
router.delete('/:id', verifyToken, deleteBank)

export default router;