import pool from '../config/db.js';

const authRepository = {
  findUserByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  createUser: async (name, lastName, email, passwordHash, phone) => {
    const query = `
      INSERT INTO users (name, lastname, email, password_hash, phone) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [
        name,
        lastName,
        email,
        passwordHash,
        phone,
      ]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

export default authRepository;
