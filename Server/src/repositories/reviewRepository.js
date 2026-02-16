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

  createReview: async () => {},
};

export default reviewRepository;
