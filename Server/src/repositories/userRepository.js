import pool from '../config/db.js';

const userRepository = {
  getUsers: async () => {
    const query = 'SELECT * FROM users';
    try {
      const result = await pool.query(query);
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
