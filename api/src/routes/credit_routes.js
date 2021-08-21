import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getCredits, getOneCredit, create, updateCredit, deleteCredit } from '../controllers/credit_controller'

router.get('/', getCredits);
router.get('/:id', getOneCredit);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updateCredit);
router.delete('/:id', verifyToken, deleteCredit);