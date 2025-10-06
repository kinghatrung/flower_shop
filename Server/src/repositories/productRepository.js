import pool from '../config/db.js';

const productRepository = {
  getProducts: async () => {
    const query =
      'SELECT p.*, c.name AS category_name  FROM products p JOIN categories c ON p.category_id = c.id ORDER BY p.created_at';
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
};

export default productRepository;
