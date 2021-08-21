import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getPromos, getOnePromo, create, updatePromo, deletePromo } from '../controllers/promo_controller'

router.get('/', getPromos);
router.get('/:id', getOnePromo);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updatePromo);
router.delete('/:id', [verifyToken, verifyAccess], deletePromo);

export default router;