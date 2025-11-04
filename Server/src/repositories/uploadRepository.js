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

  getTempImages: async (interval = '1 hour') => {
    const query = `
      SELECT id, public_id FROM product_images
      WHERE is_temp = true
        AND created_at < NOW() - INTERVAL '${interval}'
    `;
    const { rows } = await db.query(query);
    return rows;
  },

  deleteImageById: async (id) => {
    await db.query('DELETE FROM product_images WHERE id = $1', [id]);
  },
};

export default uploadRepository;
