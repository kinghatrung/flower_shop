import pool from '../config/db.js';

const productRepository = {
  getProducts: async (filters, page, limit) => {
    const { category_type, search, priceRange, status } = filters;
    try {
      let query = `
      SELECT 
        p.*, 
        c.type AS category_type, 
        c.name AS category_name,
        COALESCE(array_agg(pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL), '{}') AS images_url
      FROM products p
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE 1=1
      GROUP BY p.id, c.type, c.name
    `;
      const values = [];
      let index = 1;

      // Lọc theo danh mục (category_type)
      if (category_type && category_type.toLowerCase() !== 'tất cả') {
        query += ` AND LOWER(c.type) = LOWER($${index++})`;
        values.push(category_type);
      }

      // Lọc theo trạng thái
      if (status && status.toLowerCase() !== 'tất cả') {
        if (status.toLowerCase() === 'is_new') {
          query += ` AND p.is_new = true`;
        } else if (status.toLowerCase() === 'is_best_seller') {
          query += ` AND p.is_best_seller = true`;
        }
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

      // Tạo query đếm tổng số sản phẩm
      const countQuery = `SELECT COUNT(*) FROM (${query})`;
      const countResult = await pool.query(countQuery, values);
      const total = parseInt(countResult.rows[0].count, 10);
      const totalPages = Math.ceil(total / limit);

      // Sắp xếp mặc định mới nhất và thêm phân trang
      query += ` ORDER BY p.created_at DESC`;
      query += ` LIMIT $${index++} OFFSET $${index++}`;
      values.push(limit);
      values.push((page - 1) * limit);

      const result = await pool.query(query, values);
      return {
        products: result.rows,
        total,
        totalPages,
        currentPage: page,
        pageSize: limit,
      };
    } catch (err) {
      throw err;
    }
  },

  getProductsByCategory: async (id) => {
    try {
      const query = `
        SELECT 
          p.*, 
          c.type AS category_type,
          COALESCE(
            json_agg(
              json_build_object(
                'url', pi.image_url,
                'is_main', pi.is_main
              )
            ) FILTER (WHERE pi.image_url IS NOT NULL),
            '[]'
          ) AS images
        FROM products p
        JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images pi ON pi.product_id = p.id
        WHERE p.category_id = $1
        GROUP BY p.id, c.type
      `;

      const result = await pool.query(query, [id]);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getProduct: async (id) => {
    const query = `
      SELECT 
        p.*, 
        c.type AS category_type, 
        c.name AS category_name,
        COALESCE(
          json_agg(
            json_build_object(
              'url', pi.image_url,
              'is_main', pi.is_main
            )
          ) FILTER (WHERE pi.image_url IS NOT NULL),
          '[]'
        ) AS images
      FROM products p
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.id = $1
      GROUP BY p.id, c.type, c.name
    `;
    try {
      const result = await pool.query(query, [id]);

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  createProduct: async (
    name,
    category_id,
    description,
    price,
    original_price,
    is_new,
    is_best_seller,
    slug,
    images
  ) => {
    try {
      const query = `
        INSERT INTO products (name, price, original_price, category_id, description, is_new, is_best_seller, slug)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
      `;
      const result = await pool.query(query, [
        name,
        price,
        original_price,
        Number(category_id),
        description,
        is_new,
        is_best_seller,
        slug,
      ]);

      const productId = result.rows[0].id;

      if (images && images.length > 0) {
        await Promise.all(
          images.map((image, idx) =>
            pool.query(
              `UPDATE product_images
               SET 
                 product_id = $1,
                 image_url = $2,
                 is_main = $3,
                 sort_order = $4,
                 is_temp = $5
               WHERE public_id = $6`,
              [productId, image.url, idx === 0, idx, false, image.public_id]
            )
          )
        );
      }

      return result;
    } catch (err) {
      throw err;
    }
  },

  editProduct: async (
    productId,
    name,
    category_id,
    description,
    price,
    original_price,
    is_new,
    is_best_seller,
    slug
  ) => {
    try {
      const query = `
        UPDATE products
        SET 
          name = COALESCE($1, name), 
          category_id = COALESCE($2, category_id), 
          description = COALESCE($3, description), 
          price = COALESCE($4, price), 
          original_price = COALESCE($5, original_price), 
          is_new = COALESCE($6, is_new), 
          is_best_seller = COALESCE($7, is_best_seller),
          slug = COALESCE($8, slug)
        WHERE id = $9
        RETURNING *;
      `;
      const result = pool.query(query, [
        name,
        Number(category_id),
        description,
        price,
        original_price,
        is_new,
        is_best_seller,
        slug,
        productId,
      ]);

      return result;
    } catch (err) {
      throw err;
    }
  },
};

export default productRepository;
