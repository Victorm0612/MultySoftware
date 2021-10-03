import { verifyToken, verifyAccess, verifyTokenIsValid } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getCards, getOneCard, create, updateCard, deleteCard } from '../controllers/card_controller'

router.get('/', verifyTokenIsValid, getCards);
router.get('/:card_number', verifyTokenIsValid, getOneCard);
router.post('/', verifyTokenIsValid, create);
router.put('/:id', verifyAccess, updateCard);
router.delete('/:id', verifyAccess, deleteCard);

export default router;