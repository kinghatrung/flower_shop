import pool from '../config/db.js';

const userRepository = {
  getUsers: async (limit, page, filters) => {
    const offset = (page - 1) * limit;

    // Tạo điều kiện WHERE động
    const whereClauses = [];
    const values = [];
    let paramIndex = 1;

    if (filters.role) {
      whereClauses.push(`role = $${paramIndex++}`);
      values.push(filters.role);
    }

    if (filters.is_active !== undefined) {
      whereClauses.push(`is_active = $${paramIndex++}`);
      values.push(filters.is_active);
    }

    if (filters.is_verified !== undefined) {
      whereClauses.push(`is_verified = $${paramIndex++}`);
      values.push(filters.is_verified);
    }

    if (filters.search) {
      whereClauses.push(
        `(LOWER(name) LIKE LOWER($${paramIndex}) OR LOWER(lastname) LIKE LOWER($${paramIndex}))`
      );
      values.push(`%${filters.search}%`);
      paramIndex++;
    }

    // Gộp các điều kiện lại
    const whereSQL =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countQuery = `SELECT COUNT(*) FROM users ${whereSQL}`;
    const query = `
      SELECT * FROM users
      ${whereSQL}
      ORDER BY user_id DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex}
    `;

    values.push(limit, offset);

    try {
      const result = await pool.query(query, values);
      const countResult = await pool.query(
        countQuery,
        values.slice(0, values.length - 2)
      );

      return {
        users: result.rows,
        total: parseInt(countResult.rows[0].count, 10),
      };
    } catch (err) {
      throw err;
    }
  },

  getUserByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  editUser: async (data, id) => {
    const query = `
      UPDATE users
      SET
        name = COALESCE($1, name),
        lastname = COALESCE($2, lastname),
        email = COALESCE($3, email),
        password_hash = COALESCE($4, password_hash),
        phone = COALESCE($5, phone),
        is_verified = COALESCE($6, is_verified),
        is_active = COALESCE($7, is_active)
      WHERE user_id = $8
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [
        data.name,
        data.lastName,
        data.email,
        data.password_hash,
        data.phone,
        data.is_verified,
        data.is_active,
        id,
      ]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },
};

export default userRepository;
