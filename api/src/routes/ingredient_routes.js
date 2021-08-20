import { Router } from 'express';
const router = Router();

import { getIngredients, getOneIngredient, create, updateIngredient, deleteIngredient } from '../controllers/ingredient_controller'

router.get('/', getIngredients);
router.get('/:id', getOneIngredient);
router.post('/', create);
router.put('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);