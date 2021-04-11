import { Router } from 'express';
const router = Router();

import { create, deleteCategory, getOneCategory, getCategorys, updateCategory} from '../controllers/category_controller'

router.get('/', getCategorys);
router.get('/:id', getOneCategory);
router.post('/', create);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory)

export default router;