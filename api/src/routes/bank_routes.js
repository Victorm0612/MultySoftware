import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getBanks, getOneBank, create, updateBank, deleteBank } from '../controllers/bank_controller'

router.get('/', getBanks);
router.get('/:id', getOneBank);
router.post('/',  verifyAccess, create);
router.put('/:id', verifyAccess, updateBank);
router.delete('/:id', verifyAccess, deleteBank)

export default router;