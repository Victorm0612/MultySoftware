import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getPromos, getOnePromo, create, updatePromo, deletePromo } from '../controllers/promo_controller'

router.get('/', getPromos);
router.get('/:id', getOnePromo);
router.post('/', verifyToken, create);
router.put('/:id', updatePromo);
router.delete('/:id', deletePromo);

export default router;