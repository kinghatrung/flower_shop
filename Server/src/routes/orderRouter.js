import { Router } from 'express';
import orderController from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const orderRouter = Router();

// GET /api/orders - Get all orders (admin, paginated)
orderRouter.get('/', orderController.getOrders);

// GET /api/orders/user/:userId - Get orders by user
orderRouter.get(
  '/user/:userId',
  authMiddleware.isAuthorized,
  orderController.getOrdersByUserId
);

// GET /api/orders/:id - Get single order detail
orderRouter.get('/:id', orderController.getOrderById);

// POST /api/orders/create - Create order
orderRouter.post('/create', orderController.createOrder);

// PATCH /api/orders/:id/status - Update order status (admin)
orderRouter.patch('/:id/status', orderController.updateOrderStatus);

// DELETE /api/orders/:id - Delete order (admin)
orderRouter.delete('/:id', orderController.deleteOrder);

export default orderRouter;
