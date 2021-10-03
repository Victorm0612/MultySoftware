import { verifyToken, verifyAccess, verifyBelongsToUser } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getCards, getOneCard, create, updateCard, deleteCard } from '../controllers/card_controller'

router.get('/', verifyToken, getCards);
router.get('/:card_number', verifyToken, getOneCard);
router.post('/', verifyToken, create);
router.put('/:id', verifyAccess, updateCard);
router.delete('/:id', verifyAccess, deleteCard);

export default router;