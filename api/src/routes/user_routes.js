import { Router } from 'express';
import { verifyToken } from '../jwt/functions';
const router = Router();

import { login, refresh_token, create, deleteUser, getBirthdayUser, getClientUser, getOneUser, getUsers, updateUser } from '../controllers/user_controller';

//   /api/users/..

router.post('/login', login);
router.post('/refresh', verifyToken, refresh_token);
router.get('/', verifyToken, getUsers);
router.get('/birthday', verifyToken, getBirthdayUser);
router.get('/client', verifyToken, getClientUser);
router.get('/:id', verifyToken, getOneUser);
router.post('/register', create);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;