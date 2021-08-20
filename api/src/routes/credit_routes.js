import { Router } from 'express';
const router = Router();

import { getCredits, getOneCredit, create, updateCredit, deleteCredit } from '../controllers/credit_controller'

router.get('/', getCredits);
router.get('/:id', getOneCredit);
router.post('/', create);
router.put('/:id', updateCredit);
router.delete('/:id', deleteCredit);