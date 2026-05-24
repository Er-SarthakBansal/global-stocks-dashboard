import express from "express";
import stockRoutes from '../backend/routes/stock.routes.js';
import cors from "cors";

const app = express();

app.use(cors());

app.use('/api',stockRoutes);

export default app;