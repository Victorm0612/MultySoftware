import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { } from '../controllers/ingredientitem_controller'

router.get('/', getIngredientItems);
router.get('/:id', getOneIngredientItem);
router.post('/', create);
router.put('/:id', updateIngredientItem);
router.delete('/:id', deteleteIngredientItem);

export default router;