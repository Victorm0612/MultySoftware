import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getIngredientItems, getOneIngredientItem, create, updateIngredientItem, deleteIngredientItem } from '../controllers/ingredientitem_controller'

router.get('/', verifyToken, getIngredientItems);
router.get('/:id', verifyToken, getOneIngredientItem);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateIngredientItem);
router.delete('/:id', [verifyToken, verifyAccess], deleteIngredientItem );

export default router;
