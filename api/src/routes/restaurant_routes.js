import { Router } from 'express';
const router = Router();

import { getRestaurants, getOneRestaurant, create, updateRestaurant, deleteRestaurant } from '../controllers/restaurant_controller'

router.get('/', getRestaurants);
router.get('/:id', getOneRestaurant);
router.post('/', create);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

export default router;