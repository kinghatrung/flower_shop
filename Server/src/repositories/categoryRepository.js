import pool from '../config/db.js';

const categoryRepository = {
  getCategories: async (filters) => {
    const { search = '', type = '' } = filters;
    try {
      let whereConditions = [];
      let values = [];
      let idx = 1;

      if (search) {
        whereConditions.push(`c.name ILIKE $${idx++}`);
        values.push(`%${search}%`);
      }

      if (type && type !== 'all') {
        whereConditions.push(`c.type = $${idx++}`);
        values.push(type);
      }

      const whereClause =
        whereConditions.length > 0
          ? `WHERE ${whereConditions.join(' AND ')}`
          : '';

      const query = `
        WITH total_products AS (
          SELECT COUNT(*)::int AS total FROM products
        )
        SELECT 
          c.*,
          CASE 
            WHEN c.type = 'all' THEN t.total
            ELSE COUNT(p.id)
          END AS products_count
        FROM categories c
        LEFT JOIN products p ON p.category_id = c.id
        CROSS JOIN total_products t
        ${whereClause}
        GROUP BY c.id, t.total
        ORDER BY c.id;
      `;

      const result = await pool.query(query, values);

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
