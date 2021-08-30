import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getPromos, getOnePromo, create, updatePromo, deletePromo } from '../controllers/promo_controller'

router.get('/', getPromos);
router.get('/:id', getOnePromo);
router.post('/', verifyAccess, create);
router.put('/:id', verifyAccess, updatePromo);
router.delete('/:id', verifyAccess, deletePromo);

export default router;