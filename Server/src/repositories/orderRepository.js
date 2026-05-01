import pool from '../config/db.js';

const orderRepository = {
  getAllOrdersPaginated: async (filters = {}, page = 1, limit = 10) => {
    try {
      const { status, search } = filters;
      let whereClauses = 'WHERE 1=1';
      const whereValues = [];
      let idx = 1;

      if (status && status !== 'all') {
        whereClauses += ` AND o.status = $${idx++}`;
        whereValues.push(status);
      }

      if (search && search.trim()) {
        whereClauses += ` AND (LOWER(o.full_name) LIKE LOWER($${idx++}) OR o.order_code LIKE $${idx++})`;
        whereValues.push(`%${search.trim()}%`);
        whereValues.push(`%${search.trim()}%`);
        idx++; // already incremented twice but idx tracks unique placeholders
      }

      const countQuery = `SELECT COUNT(*) AS total FROM orders o ${whereClauses}`;
      const countResult = await pool.query(countQuery, whereValues);
      const total = parseInt(countResult.rows[0].total, 10);
      const totalPages = Math.ceil(total / limit);

      const offset = (page - 1) * limit;
      const dataQuery = `
        SELECT o.*
        FROM orders o
        ${whereClauses}
        ORDER BY o.created_at DESC
        LIMIT $${idx++} OFFSET $${idx++}
      `;
      const dataResult = await pool.query(dataQuery, [
        ...whereValues,
        limit,
        offset,
      ]);

      return {
        orders: dataResult.rows,
        total,
        totalPages,
        currentPage: page,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      };
    } catch (err) {
      throw err;
    }
  },

  getAllOrders: async () => {
    try {
      const query = `SELECT * FROM orders ORDER BY created_at DESC;`;
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getOrderById: async (id) => {
    try {
      const orderQuery = `SELECT * FROM orders WHERE id = $1`;
      const orderResult = await pool.query(orderQuery, [id]);
      if (!orderResult.rows[0]) return null;

      const itemsQuery = `
        SELECT oi.*, p.name, p.slug,
          COALESCE(
            json_agg(
              json_build_object('url', pi.image_url, 'is_main', pi.is_main)
            ) FILTER (WHERE pi.image_url IS NOT NULL),
            '[]'
          ) AS images
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        LEFT JOIN product_images pi ON pi.product_id = p.id
        WHERE oi.order_id = $1
        GROUP BY oi.id, p.name, p.slug
      `;
      const itemsResult = await pool.query(itemsQuery, [id]);

      return { ...orderResult.rows[0], items: itemsResult.rows };
    } catch (err) {
      throw err;
    }
  },

  getOrdersByUserId: async (userId) => {
    try {
      const query = `
        SELECT o.*,
          COALESCE(
            json_agg(
              json_build_object(
                'id', oi.id,
                'product_id', oi.product_id,
                'quantity', oi.quantity,
                'price', oi.price,
                'name', p.name
              )
            ) FILTER (WHERE oi.id IS NOT NULL),
            '[]'
          ) AS items
        FROM orders o
        LEFT JOIN order_items oi ON oi.order_id = o.id
        LEFT JOIN products p ON p.id = oi.product_id
        WHERE o.user_id = $1
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `;
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const query = `
        UPDATE orders SET status = $1, updated_at = NOW()
        WHERE id = $2 RETURNING *
      `;
      const result = await pool.query(query, [status, id]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  deleteOrder: async (id) => {
    try {
      await pool.query(`DELETE FROM order_items WHERE order_id = $1`, [id]);
      await pool.query(`DELETE FROM orders WHERE id = $1`, [id]);
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
