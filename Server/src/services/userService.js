import pool from '../config/db.js';

const userService = {
  getAllUsers: async () => {
    try {
      const users = await pool.query('SELECT * FROM users');
      return users.rows;
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
