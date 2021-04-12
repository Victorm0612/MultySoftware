import { Router } from 'express';
const router = Router();

import { create, deleteUser, getBirthdayUser, getClientUser, getOneUser, getUsers, updateUser } from '../controllers/user_controller';

//   /api/users/..
router.get('/', getUsers);
router.get('/birthday', getBirthdayUser);
router.get('/client', getClientUser);
router.get('/:id', getOneUser);
router.post('/', create);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;