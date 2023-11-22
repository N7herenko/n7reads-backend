import express from 'express';

import { getGoal, setGoal } from '../controllers/goal.js';

const router = express.Router();

router.get('/', getGoal);

router.patch('/', setGoal);


export default router;