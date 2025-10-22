import pool from '../config/db.js';

const cartRepository = {
  getUserProductCart: async (userId) => {
    try {
      const query = `
        SELECT 
            cp.*, 
            cp.quantity,
            p.name, 
            p.price, 
            p.description,   
            p.slug, 
            COALESCE(
                json_agg(
                json_build_object(
                    'url', pi.image_url,
                    'is_main', pi.is_main
                )
                ) FILTER (WHERE pi.image_url IS NOT NULL),
                '[]'
            ) AS images,
            SUM(p.price * cp.quantity) OVER () AS total_amount
        FROM cart_products cp
        JOIN products p ON cp.product_id = p.id
        LEFT JOIN product_images pi ON p.id = pi.product_id
        WHERE cp.user_id = $1
        GROUP BY cp.id, p.id ORDER BY p.created_at DESC
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
        INSERT INTO cart_products (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET quantity = cart_products.quantity + EXCLUDED.quantity
        RETURNING *;
    `;

      const result = await pool.query(query, [userId, productId, quantity]);

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  updateQuantity: async (userId, productId, quantity) => {
    try {
      const query = `
        UPDATE cart_products
        SET quantity = $3
        WHERE user_id = $1 AND product_id = $2
    `;

      await pool.query(query, [userId, productId, quantity]);

      return;
    } catch (err) {
      throw err;
    }
  },

  deleteProductCart: async (userId, productId) => {
    try {
      const query = `
        DELETE FROM cart_products
        WHERE user_id = $1 AND product_id = $2
    `;

      await pool.query(query, [userId, productId]);

      return;
    } catch (err) {
      throw err;
    }
  },
};

export default cartRepository;
