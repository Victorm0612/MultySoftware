import { verifyToken, verifyAccess, verifyBelongsToUser } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getCards, getOneCard, create, updateCard, deleteCard } from '../controllers/card_controller'

router.get('/', verifyAccess, getCards);
router.get('/:id', verifyBelongsToUser, getOneCard);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updateCard);
router.delete('/:id', verifyAccess, deleteCard);