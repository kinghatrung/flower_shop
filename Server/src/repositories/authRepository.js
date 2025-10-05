import pool from '../config/db.js';

const authRepository = {
  findUserByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  createUser: async (
    name,
    lastName,
    email,
    passwordHash,
    phone,
    avatar,
    type = 'LOCAL',
    is_verified = true
  ) => {
    const query = `
      INSERT INTO users (name, lastname, email, password_hash, phone, avatar_url, type, is_verified) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [
        name,
        lastName,
        email,
        passwordHash,
        phone,
        avatar,
        type,
        is_verified,
      ]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  updatePasswordUser: async (email, newPassword) => {
    const query = 'UPDATE users SET password_hash = $1 WHERE email = $2';
    try {
      const result = await pool.query(query, [newPassword, email]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },
};

export default authRepository;
