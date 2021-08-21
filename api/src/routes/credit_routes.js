import { verifyToken, verifyAccess, verifyBelongsToUser } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getCredits, getOneCredit, create, updateCredit, deleteCredit } from '../controllers/credit_controller'

router.get('/', [verifyToken, verifyAccess], getCredits);
router.get('/:id', [verifyToken, verifyBelongsToUser], getOneCredit);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateCredit);
router.delete('/:id', [verifyToken, verifyAccess], deleteCredit);