import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getIngredients, getOneIngredient, create, updateIngredient, deleteIngredient } from '../controllers/ingredient_controller'

router.get('/',  getIngredients);
router.get('/:id', getOneIngredient);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updateIngredient);
router.delete('/:id', verifyAccess, deleteIngredient);