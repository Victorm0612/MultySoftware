import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getIngredients, getOneIngredient, create, updateIngredient, deleteIngredient } from '../controllers/ingredient_controller'

router.get('/', verifyToken, getIngredients);
router.get('/:id', verifyToken, getOneIngredient);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateIngredient);
router.delete('/:id', [verifyToken, verifyAccess], deleteIngredient);