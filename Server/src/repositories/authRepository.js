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
    type
  ) => {
    const query = `
      INSERT INTO users (name, lastname, email, password_hash, phone, avatar_url, type) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
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
      ]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },
};

export default authRepository;
