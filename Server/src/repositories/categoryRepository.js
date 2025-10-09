import pool from '../config/db.js';

const categoryRepository = {
  getCategories: async () => {
    const query = `
      SELECT 
        c.*, 
        COUNT(p.id) AS products_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id
      order by c.id
    `;
    try {
      const result = await pool.query(query);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  deleteCategoryByType: async (type) => {
    const query = `
      DELETE FROM categories
      WHERE type = $1
    `;
    try {
      await pool.query(query, [type]);
      return true;
    } catch (err) {
      throw err;
    }
  },
};

export default categoryRepository;
