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

  createCategory: async (name, type, description) => {
    const query = `
      INSERT INTO categories (name, type, description)
      VALUES ($1, $2, $3)
    `;

    try {
      await pool.query(query, [name, type, description]);

      return true;
    } catch (err) {
      throw err;
    }
  },

  editCategoryById: async (id, name, type, description) => {
    const query = `
      UPDATE categories 
      SET 
        name = COALESCE($1, name), 
        type = COALESCE($2, type), 
        description = COALESCE($3, description)
      WHERE id = $4
      RETURNING *;
    `;

    try {
      const result = await pool.query(query, [name, type, description, id]);

      return result.rows[0];
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
