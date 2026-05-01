import pool from '../config/db.js';
import orderRepository from '../repositories/orderRepository.js';
import cartRepository from '../repositories/cartRepository.js';
import { sendOrderSuccessEmail } from '../utils/mailer.js';

const orderService = {
  getOrders: async (filters, page, limit) => {
    try {
      const result = await orderRepository.getAllOrdersPaginated(
        filters,
        page,
        limit
      );
      return result;
    } catch (err) {
      throw err;
    }
  },

  getOrderById: async (id) => {
    try {
      return await orderRepository.getOrderById(id);
    } catch (err) {
      throw err;
    }
  },

  getOrdersByUserId: async (userId) => {
    try {
      return await orderRepository.getOrdersByUserId(userId);
    } catch (err) {
      throw err;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      return await orderRepository.updateOrderStatus(id, status);
    } catch (err) {
      throw err;
    }
  },

  deleteOrder: async (id) => {
    try {
      return await orderRepository.deleteOrder(id);
    } catch (err) {
      throw err;
    }
  },

  createOrder: async (orderData, cartItems) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const orderCode = `ORD-${Date.now()}`;

      await cartRepository.clearCart(client, orderData.user_id);

      const order = await orderRepository.createOrder(
        client,
        orderData,
        totalAmount,
        orderCode
      );

      for (const item of cartItems) {
        await orderRepository.createOrderItem(client, order.id, item);
      }

      await sendOrderSuccessEmail(orderData, cartItems, totalAmount, orderCode);

      await client.query('COMMIT');

      return order;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },
};

export default orderService;
