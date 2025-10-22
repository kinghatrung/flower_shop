import pool from '../config/db.js';

const cartRepository = {
  getUserProductCart: async (userId) => {
    try {
      const query = `
        SELECT cp.*, p.name, p.price
        FROM cart_products cp
        JOIN products p ON cp.product_id = p.id
        WHERE cp.user_id = $1;
    `;

      const result = await pool.query(query, [userId]);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  addProductToCart: async (userId, productId, quantity = 1) => {
    try {
      const query = `
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
        RETURNING *;
    `;

      const result = await pool.query(query, [userId, productId, quantity]);

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },
};

export default cartRepository;
