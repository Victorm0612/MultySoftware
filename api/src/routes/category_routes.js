import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteCategory, getOneCategory, getCategorys, updateCategory} from '../controllers/category_controller'

router.get('/', getCategorys);
router.get('/:id', getOneCategory);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updateCategory);
router.delete('/:id', verifyToken, deleteCategory)

export default router;