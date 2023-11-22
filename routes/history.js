import express from 'express';

import { getHistories, createHistory } from '../controllers/history.js';

const router = express.Router();

router.get('/', getHistories);

router.post('/', createHistory);

export default router;