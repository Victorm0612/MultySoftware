import { Router } from 'express';
import { verifyToken, verifyAccess } from '../middlewares'
const router = Router();

import { create, deleteProduct, getOneProduct, getProducts, getProductsByName, updateProduct } from '../controllers/product_controller';

router.get('/', getProducts);
router.get('/un_producto', getProductsByName);
router.get('/:id', getOneProduct);
router.post('/', verifyAccess, create);
router.put('/:id',  verifyAccess, updateProduct);
router.delete('/:id', verifyAccess, deleteProduct);

export default router;