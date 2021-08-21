import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getIngredients, getOneIngredient, create, updateIngredient, deleteIngredient } from '../controllers/ingredient_controller'

router.get('/', getIngredients);
router.get('/:id', getOneIngredient);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updateIngredient);
router.delete('/:id', verifyToken, deleteIngredient);