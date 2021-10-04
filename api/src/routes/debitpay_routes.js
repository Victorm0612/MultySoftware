import { verifyAccess, verifyBelongsToUser, verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import {
  create,
  deleteDebit_Pay,
  getOneDebit_Pay,
  getDebitPays,
  updateDebit_Pay,
} from "../controllers/debit_paycontroller";

router.get('/', verifyToken, getDebitPays);
router.get('/:id', verifyToken, getOneDebit_Pay);
router.post('/', verifyToken, create);
router.put('/:id', verifyAccess, updateDebit_Pay);
router.delete('/:id', verifyAccess, deleteDebit_Pay);

export default router;
