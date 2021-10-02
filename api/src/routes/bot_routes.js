import { Router } from 'express';
const router = Router();

import { processMessage } from '../controllers/bot_controller'

router.get('/', processMessage)

export default router;