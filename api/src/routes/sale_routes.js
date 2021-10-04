import { verifyAccess, verifyTokenIsValid} from '../middlewares'
import { Router } from 'express';

const router = Router();

import {
  create,
  deleteSale,
  getOneSale,
  getSales,
  updateSale,
  getSalesDateRange,
} from "../controllers/sale_controller";

router.get('/', verifyTokenIsValid, getSales);
router.get('/:id', verifyTokenIsValid, getOneSale);
router.get('/dateRange/sales', verifyTokenIsValid, getSalesDateRange)
router.post('/', verifyTokenIsValid, create);
router.put('/:id', verifyAccess, updateSale);
router.delete('/:id', verifyAccess, deleteSale);

export default router;
