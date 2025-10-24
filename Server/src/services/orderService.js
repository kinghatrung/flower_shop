import pool from '../config/db.js';
import orderRepository from '../repositories/orderRepository.js';
import cartRepository from '../repositories/cartRepository.js';
import { sendOrderSuccessEmail } from '../utils/mailer.js';

const orderService = {
  createOrder: async (orderData, cartItems) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1️⃣ Tính tổng tiền
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // 2️⃣ Tạo mã đơn hàng
      const orderCode = `ORD-${Date.now()}`;

      // 3️⃣ (Tuỳ chọn) Xoá giỏ hàng sau khi đặt hàng
      await cartRepository.clearCart(client, orderData.user_id);

      // 4️⃣ Lưu đơn hàng
      const order = await orderRepository.createOrder(
        client,
        orderData,
        totalAmount,
        orderCode
      );

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
