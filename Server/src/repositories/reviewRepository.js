import pool from '../config/db.js';

const reviewRepository = {
  findReviewByProductId: async (product_id) => {
    try {
      const query = `
            SELECT 
                r.id, r.rating, r.title, r.comment, r.created_at, 
                u.name AS user_name, u.lastname, u.avatar_url, u.user_id
            FROM reviews r
            JOIN users u ON r.user_id = u.user_id 
            WHERE r.product_id = $1 
            ORDER BY r.created_at DESC
        `;

      const result = await pool.query(query, [product_id]);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  createReview: async (userId, productId, rating, title, comment) => {
    try {
      const query = `
        INSERT INTO reviews (user_id, product_id, rating, title, comment)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const result = await pool.query(query, [
        userId,
        productId,
        rating,
        title,
        comment,
      ]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  updateReview: async (id, userId, rating, title, comment) => {
    try {
      const query = `
        UPDATE reviews
        SET rating = $1, title = $2, comment = $3, updated_at = NOW()
        WHERE id = $4 AND user_id = $5
        RETURNING *
      `;
      const result = await pool.query(query, [
        rating,
        title,
        comment,
        id,
        userId,
      ]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  deleteReview: async (id, userId) => {
    try {
      const query = `DELETE FROM reviews WHERE id = $1 AND user_id = $2`;
      await pool.query(query, [id, userId]);
    } catch (err) {
      throw err;
    }
  },
};

export default reviewRepository;
