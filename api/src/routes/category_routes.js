import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { create, deleteCategory, getOneCategory, getCategorys, updateCategory} from '../controllers/category_controller'

router.get('/', verifyToken, getCategorys);
router.get('/:id', verifyToken, getOneCategory);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateCategory);
router.delete('/:id', [verifyToken, verifyAccess], deleteCategory)

export default router;