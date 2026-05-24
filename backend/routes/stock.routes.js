import express from 'express';
const router = express.Router();

import { fetchStockData } from '../controllers/stock.controller.js';

router.get('/quote',fetchStockData);

export default router;