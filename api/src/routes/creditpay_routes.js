import { verifyAccess, verifyTokenIsValid, verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import {
  create,
  deleteCredit_Pay,
  getOneCredit_Pay,
  getCreditPays,
  updateCredit_Pay,
} from "../controllers/credit_paycontroller";

router.get('/', verifyTokenIsValid, getCreditPays);
router.get('/:id', verifyTokenIsValid, getOneCredit_Pay);
router.post('/', verifyTokenIsValid, create);
router.put('/:id', verifyAccess, updateCredit_Pay);
router.delete('/:id', verifyAccess, deleteCredit_Pay);

export default router;
