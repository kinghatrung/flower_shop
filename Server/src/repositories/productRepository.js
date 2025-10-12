import pool from '../config/db.js';

const productRepository = {
  getProducts: async (filters) => {
    const { category_type, search, priceRange } = filters;

    let query = `
      SELECT p.*, c.type AS category_type, c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const values = [];
    let index = 1;

    // Lọc theo danh mục (category_type)
    if (category_type && category_type.toLowerCase() !== 'tất cả') {
      query += ` AND LOWER(c.type) = LOWER($${index++})`;
      values.push(category_type);
    }

    // Lọc theo khoảng giá
    if (priceRange) {
      if (priceRange === '500-1000') {
        query += ` AND p.price BETWEEN 500000 AND 1000000`;
      } else if (priceRange === '1000-2000') {
        query += ` AND p.price BETWEEN 1000000 AND 2000000`;
      } else if (priceRange === '2000+') {
        query += ` AND p.price > 2000000`;
      } else if (priceRange === '0-500') {
        query += ` AND p.price < 500000`;
      }
    }

    // Tìm kiếm theo tên sản phẩm
    if (search && search.trim() !== '') {
      query += ` AND LOWER(p.name) LIKE LOWER($${index++})`;
      values.push(`%${search}%`);
    }

    // Sắp xếp mặc định mới nhất
    query += ` ORDER BY p.created_at DESC`;

    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
};

export default productRepository;
