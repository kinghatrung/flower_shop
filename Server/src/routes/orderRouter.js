import { Router } from 'express';
import orderController from '../controllers/orderController.js';

const orderRouter = Router();

orderRouter.post('/create', orderController.createOrder);

export default orderRouter;
