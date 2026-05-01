import pool from '../config/db.js';

const statsRepository = {
  getOverview: async () => {
    try {
      const query = `
        SELECT
          (SELECT COUNT(*) FROM orders)::int AS total_orders,
          (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status != 'cancelled')::bigint AS total_revenue,
          (SELECT COUNT(*) FROM users WHERE role = 'customer')::int AS total_customers,
          (SELECT COUNT(*) FROM products)::int AS total_products,
          (SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURRENT_DATE)::int AS orders_today,
          (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE DATE(created_at) = CURRENT_DATE AND status != 'cancelled')::bigint AS revenue_today
      `;
      const result = await pool.query(query);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  getRevenueChart: async () => {
    try {
      const query = `
        SELECT
          TO_CHAR(DATE_TRUNC('month', created_at), 'MM/YYYY') AS month,
          EXTRACT(MONTH FROM created_at)::int AS month_num,
          EXTRACT(YEAR FROM created_at)::int AS year,
          COALESCE(SUM(total_amount), 0)::bigint AS revenue,
          COUNT(*)::int AS orders
        FROM orders
        WHERE status != 'cancelled'
          AND created_at >= NOW() - INTERVAL '12 months'
        GROUP BY DATE_TRUNC('month', created_at), month_num, year
        ORDER BY DATE_TRUNC('month', created_at) ASC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getTopProducts: async () => {
    try {
      const query = `
        SELECT
          p.id,
          p.name,
          p.price,
          COALESCE(
            (SELECT pi.image_url FROM product_images pi WHERE pi.product_id = p.id AND pi.is_main = true LIMIT 1),
            ''
          ) AS main_image,
          SUM(oi.quantity)::int AS total_sold,
          SUM(oi.quantity * oi.price)::bigint AS total_revenue
        FROM order_items oi
        JOIN products p ON p.id = oi.product_id
        JOIN orders o ON o.id = oi.order_id
        WHERE o.status != 'cancelled'
        GROUP BY p.id, p.name, p.price
        ORDER BY total_sold DESC
        LIMIT 5
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getRecentOrders: async () => {
    try {
      const query = `
        SELECT
          o.id,
          o.order_code,
          o.full_name,
          o.email,
          o.total_amount,
          o.status,
          o.payment_method,
          o.created_at
        FROM orders o
        ORDER BY o.created_at DESC
        LIMIT 8
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
};

export default statsRepository;
