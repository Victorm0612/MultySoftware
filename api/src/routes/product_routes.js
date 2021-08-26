import { Router } from 'express';
import { verifyToken, verifyAccess } from '../middlewares'
const router = Router();

import { create, deleteProduct, getOneProduct, getProducts, getProductsByName, updateProduct } from '../controllers/product_controller';

router.get('/', verifyToken, getProducts);
router.get('/un_producto', verifyToken, getProductsByName);
router.get('/:id', verifyToken, getOneProduct);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateProduct);
router.delete('/:id', [verifyToken, verifyAccess], deleteProduct);

export default router;