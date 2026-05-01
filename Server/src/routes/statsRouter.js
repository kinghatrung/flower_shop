import { Router } from 'express';
import statsController from '../controllers/statsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const statsRouter = Router();

// GET /api/stats/overview
statsRouter.get('/overview', statsController.getOverview);

// GET /api/stats/revenue-chart
statsRouter.get('/revenue-chart', statsController.getRevenueChart);

// GET /api/stats/top-products
statsRouter.get('/top-products', statsController.getTopProducts);

// GET /api/stats/recent-orders
statsRouter.get('/recent-orders', statsController.getRecentOrders);

export default statsRouter;
