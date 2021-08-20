import { Router } from 'express';
const router = Router();

import { getBanks, getOneBank, create, updateBank, deleteBank } from '../controllers/bank_controller'

router.get('/', getBanks);
router.get('/:id', getOneBank);
router.post('/', create);
router.put('/:id', updateBank);
router.delete('/:id', deleteBank)

export default router;