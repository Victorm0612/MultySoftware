import { Router } from 'express';
const router = Router();

import { getDebits, getOneDebit, create, updateDebit, deleteDebit } from '../controllers/debit_controller'

router.get('/', getDebits);
router.get('/:id', getOneDebit);
router.post('/', create);
router.put('/:id', updateDebit);
router.delete('/:id', deleteDebit);

export default router;