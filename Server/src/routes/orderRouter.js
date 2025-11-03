import { Router } from 'express';
import orderController from '../controllers/orderController.js';

const orderRouter = Router();

// GET /api/orders - Get orders
orderRouter.get('/', orderController.getOrders);

// POST /api/orders/create - Create order
orderRouter.post('/create', orderController.createOrder);

export default orderRouter;
