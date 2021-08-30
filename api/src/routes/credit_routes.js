import { verifyToken, verifyAccess, verifyBelongsToUser } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getCredits, getOneCredit, create, updateCredit, deleteCredit } from '../controllers/credit_controller'

router.get('/', verifyAccess, getCredits);
router.get('/:id', verifyBelongsToUser, getOneCredit);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updateCredit);
router.delete('/:id', verifyAccess, deleteCredit);