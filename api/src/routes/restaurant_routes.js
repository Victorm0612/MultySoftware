import { verifyToken } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getRestaurants, getOneRestaurant, create, updateRestaurant, deleteRestaurant } from '../controllers/restaurant_controller'

router.get('/', getRestaurants);
router.get('/:id', getOneRestaurant);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, updateRestaurant);
router.delete('/:id', verifyToken, deleteRestaurant);

export default router;