import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteCategory, getOneCategory, getCategorys, updateCategory} from '../controllers/category_controller'

router.get('/', getCategorys);
router.get('/:id', getOneCategory);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updateCategory);
router.delete('/:id', verifyAccess, deleteCategory)

export default router;