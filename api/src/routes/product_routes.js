import { Router } from 'express';
import { verifyToken } from '../middlewares'
const router = Router();

import { create, deleteProduct, getOneProduct, getProducts, getProductsByName, updateProduct } from '../controllers/product_controller';

router.get('/', getProducts);
router.get('/un_producto', getProductsByName);
router.get('/:id', getOneProduct);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;