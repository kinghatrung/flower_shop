import pool from '../config/db.js';

const userRepository = {
  getUsers: async (limit, page) => {
    const offset = (page - 1) * limit;
    const query =
      'SELECT * FROM users ORDER BY user_id DESC LIMIT $1 OFFSET $2';
    try {
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
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
