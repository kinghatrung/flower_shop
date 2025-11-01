import pool from '../config/db.js';

const orderRepository = {
  getAllOrders: async () => {
    try {
      const query = `
        SELECT * FROM orders;
      `;

      const result = await pool.query(query);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  createOrder: async (client, orderData, totalAmount, orderCode) => {
    const {
      user_id,
      fullName,
      email,
      phone,
      address,
      ward,
      district,
      city,
      note,
      payment_method,
    } = orderData;

    const query = `
      INSERT INTO orders (
        order_code, user_id, full_name, email, phone,
        address, ward, district, city,
        note, payment_method, total_amount
      )
      VALUES ($1 ,$2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8 ,$9 ,$10 ,$11 ,$12)
      RETURNING *;
    `;
    try {
      const result = await client.query(query, [
        orderCode,
        user_id,
        fullName,
        email,
        phone,
        address,
        ward,
        district,
        city,
        note,
        payment_method,
        totalAmount,
      ]);

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  createOrderItem: async (client, orderId, item) => {
    try {
      const query = `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4);
      `;

      await client.query(query, [
        orderId,
        item.product_id,
        item.quantity,
        item.price,
      ]);
    } catch (err) {
      throw err;
    }
  },
};

export default orderRepository;
