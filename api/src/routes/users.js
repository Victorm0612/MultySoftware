import { Router } from 'express';
const router = Router();

import { create, deleteUser, getOneUser, getUsers, updateUser } from '../controllers/users.controller';

//   /api/users/..
router.get('/', getUsers);
router.get('/:id', getOneUser);
router.post('/', create);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;