import { Router } from 'express';
const router = Router();

import { create, deleteDomicile, getOneDomicile, getDomiciles, updateDomicile } from '../controllers/domicile_controller'

router.get('/', getDomiciles);
router.get('/:id', getOneDomicile);
router.post('/', create);
router.put('/:id', updateDomicile);
router.delete('/:id', deleteDomicile);

export default router