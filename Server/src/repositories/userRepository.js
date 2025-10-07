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
};

export default userRepository;
