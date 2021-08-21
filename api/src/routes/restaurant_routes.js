import { verifyToken, verifyAccess } from '../middlewares'
import { Router } from 'express';
const router = Router();

import { getRestaurants, getOneRestaurant, create, updateRestaurant, deleteRestaurant } from '../controllers/restaurant_controller'

router.get('/', verifyToken, getRestaurants);
router.get('/:id', verifyToken, getOneRestaurant);
router.post('/', [verifyToken, verifyAccess], create);
router.put('/:id', [verifyToken, verifyAccess], updateRestaurant);
router.delete('/:id', [verifyToken, verifyAccess], deleteRestaurant);

export default router;