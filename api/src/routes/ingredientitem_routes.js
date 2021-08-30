import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getIngredientItems, getOneIngredientItem, create, updateIngredientItem, deleteIngredientItem } from '../controllers/ingredientitem_controller'

router.get('/', getIngredientItems);
router.get('/:id', getOneIngredientItem);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updateIngredientItem);
router.delete('/:id',  verifyAccess, deleteIngredientItem );

export default router;
