import pool from '../config/db.js';

const uploadRepository = {
  // Lưu metadata của ảnh vào database
  saveImageMetadata: async ({
    url,
    publicId,
    productId = null,
    isTemp = true,
  }) => {
    const query = `
          INSERT INTO product_images (image_url, public_id, product_id, is_temp, created_at, updated_at)
          VALUES ($1, $2, $3, $4, NOW(), NOW())
          RETURNING id, image_url, public_id, product_id, is_temp, created_at;
        `;
    const values = [url, publicId, productId, isTemp];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // // Xóa metadata theo ID (khi cần rollback hoặc cronjob)
  // deleteImageById: async (id) => {
  //   const query = `DELETE FROM product_images WHERE id = $1;`;
  //   await pool.query(query, [id]);
  // },

  // // Lấy danh sách ảnh tạm (để cronjob xử lý)
  // getOldTempImages: async (days = 1) => {
  //   const query = `
  //     SELECT id, public_id
  //     FROM product_images
  //     WHERE is_temp = true
  //     AND created_at < NOW() - INTERVAL '${days} day';
  //   `;
  //   const { rows } = await pool.query(query);
  //   return rows;
  // },
};

export default uploadRepository;
