import { Router } from 'express';
const router = Router();

import { create, deleteProduct, getOneProduct, getProducts, getProductsByName, updateProduct } from '../controllers/product_controller';

router.get('/', getProducts);
router.get('/un_producto', getProductsByName);
router.get('/:id', getOneProduct);
router.post('/', create);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;