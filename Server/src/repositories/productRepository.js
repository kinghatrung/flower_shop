import pool from '../config/db.js';

const productRepository = {
  getProducts: async (filters, page, limit) => {
    const { category_type, search, priceRange, status } = filters;

    // 💡 Sửa đổi quan trọng: Xác định xem có cần phân trang hay không
    // Chỉ phân trang khi cả page và limit đều là số dương hợp lệ.
    const hasPagination =
      page && limit && !isNaN(page) && !isNaN(limit) && page > 0 && limit > 0;

    // Nếu không có phân trang, đặt page/limit về giá trị an toàn cho kết quả trả về
    const actualPage = hasPagination ? page : 1;
    const actualLimit = hasPagination ? limit : Infinity; // Giả định lấy tất cả

    try {
      let whereClauses = ' WHERE 1=1'; // Chuỗi điều kiện WHERE chung
      const whereValues = []; // Mảng tham số chung cho WHERE
      let index = 1;

      // --- Bắt đầu xây dựng mệnh đề WHERE chung cho cả truy vấn DATA và COUNT ---

      if (category_type && category_type.toLowerCase() !== 'tất cả') {
        whereClauses += ` AND LOWER(c.type) = LOWER($${index++})`;
        whereValues.push(category_type.toString());
      }

      if (status && status.toLowerCase() !== 'tất cả') {
        if (status.toLowerCase() === 'is_new') {
          whereClauses += ` AND p.is_new = true`;
        } else if (status.toLowerCase() === 'is_best_seller') {
          whereClauses += ` AND p.is_best_seller = true`;
        }
      }

      if (priceRange) {
        if (priceRange === '0-500') whereClauses += ` AND p.price < 500000`;
        else if (priceRange === '500-1000')
          whereClauses += ` AND p.price BETWEEN 500000 AND 1000000`;
        else if (priceRange === '1000-2000')
          whereClauses += ` AND p.price BETWEEN 1000000 AND 2000000`;
        else if (priceRange === '2000+')
          whereClauses += ` AND p.price > 2000000`;
      }

      if (search && search.trim() !== '') {
        whereClauses += ` AND LOWER(p.name) LIKE LOWER($${index++})`;
        whereValues.push(`%${search.toString().trim()}%`);
      }

      // --- Kết thúc xây dựng WHERE clause ---

      // *************************************************************
      // 1. TRUY VẤN ĐẾM (COUNT QUERY) - Chỉ chạy khi có yêu cầu phân trang
      // *************************************************************

      let total = 0;
      let totalPages = 1;

      if (hasPagination) {
        // Sử dụng logic WHERE và values đã xây dựng
        const countQuery = `
                SELECT COUNT(*) AS total
                FROM products p
                JOIN categories c ON p.category_id = c.id
                ${whereClauses}
            `;
        // Mảng tham số cho COUNT chỉ là whereValues
        const countResult = await pool.query(countQuery, whereValues);

        total = parseInt(countResult.rows[0].total, 10);
        totalPages = Math.ceil(total / actualLimit);
      }

      // *************************************************************
      // 2. TRUY VẤN DATA CHÍNH (MAIN QUERY)
      // *************************************************************

      let query = `
            SELECT 
                p.*,
                c.type AS category_type, c.name AS category_name,
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
            ${whereClauses}
            GROUP BY p.id, c.type, c.name 
            ORDER BY p.created_at DESC
        `;

      // Khởi tạo mảng tham số cho truy vấn chính (bắt đầu bằng whereValues)
      const queryValues = [...whereValues];

      // 💡 Sửa đổi quan trọng: Chỉ thêm LIMIT/OFFSET nếu có phân trang
      if (hasPagination) {
        const offset = (actualPage - 1) * actualLimit;

        // index đã được cập nhật từ bước WHERE clause, tiếp tục sử dụng
        query += ` LIMIT $${index++} OFFSET $${index++}`;
        queryValues.push(actualLimit);
        queryValues.push(offset);
      }

      const result = await pool.query(query, queryValues);

      // Nếu không có phân trang, tính tổng dựa trên kết quả trả về
      if (!hasPagination) {
        total = result.rows.length;
        totalPages = 1;
      }

      return {
        products: result.rows,
        total,
        totalPages,
        currentPage: actualPage,
        pageSize: hasPagination ? actualLimit : result.rows.length,
      };
    } catch (err) {
      throw err;
    }
  },

  getProductsAll: async () => {
    try {
      const query = `
        SELECT 
          p.*,
          c.type AS category_type, c.name AS category_name,
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
        GROUP BY p.id, c.type, c.name
        ORDER BY p.created_at DESC
      `;

      const result = await pool.query(query);

      return result.rows;
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

  deleteProductById: async (productId) => {
    try {
      const query = `
        DELETE 
        FROM products
        WHERE id = $1
      `;
      await pool.query(query, [productId]);

      return;
    } catch (err) {
      throw err;
    }
  },
};

export default productRepository;
