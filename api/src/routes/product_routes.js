import { Router } from 'express';
const router = Router();

import { create, deleteProduct, getOneProduct, getProducts, updateProduct } from '../controllers/product_controller';

router.get('/', getProducts);
router.get('/:id', getOneProduct);
router.post('/', create);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;