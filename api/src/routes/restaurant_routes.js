import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getRestaurants, getOneRestaurant, create, updateRestaurant, deleteRestaurant } from '../controllers/restaurant_controller'

router.get('/', getRestaurants);
router.get('/:id',  getOneRestaurant);
router.post('/',  verifyAccess, create);
router.put('/:id',  verifyAccess, updateRestaurant);
router.delete('/:id', verifyAccess, deleteRestaurant);

export default router;