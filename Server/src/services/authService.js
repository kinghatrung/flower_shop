import bcrypt from 'bcrypt';

import authRepository from '../repositories/authRepository.js';
import { generateToken, verifyToken } from '../providers/JwtProvider.js';

const authService = {
  loginUser: async (email, password) => {
    try {
      const checkUser = await authRepository.findUserByEmail(email);
      if (!checkUser) throw new Error('Email không tồn tại!');
      if (password.length < 8)
        throw new Error('Mật khẩu phải có ít nhất 8 ký tự!');

      const validatePassword = await bcrypt.compare(
        password,
        checkUser.password_hash
      );

      if (!validatePassword) throw new Error('Mật khẩu không đúng!');

      const accessToken = await generateToken(
        checkUser,
        process.env.JWT_ACCESS_TOKEN,
        '1h'
      );

      const refreshToken = await generateToken(
        checkUser,
        process.env.JWT_REFRESH_TOKEN,
        '7 days'
      );

      const { password_hash, ...userWithoutPassword } = checkUser;

      return { user: userWithoutPassword, accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  },

  registerUser: async (name, lastName, email, password, rePassword, phone) => {
    try {
      const checkUser = await authRepository.findUserByEmail(email);

      if (checkUser) throw new Error('Email đã tồn tại!');
      if (password.length < 8)
        throw new Error('Mật khẩu phải có ít nhất 8 ký tự!');
      if (password !== rePassword) throw new Error('Mật khẩu không khớp!');

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await authRepository.createUser(
        name,
        lastName,
        email,
        hashPassword,
        phone
      );

      return newUser;
    } catch (err) {
      throw err;
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const refreshTokenDecoded = await verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN
      );

      const userInfo = {
        user_id: refreshTokenDecoded.user_id,
        email: refreshTokenDecoded.email,
        lastname: refreshTokenDecoded.lastname,
        phone: refreshTokenDecoded.phone,
        date_of_birth: refreshTokenDecoded.date_of_birth,
        avatar_url: refreshTokenDecoded.avatar_url,
        is_active: refreshTokenDecoded.is_active,
        email_verified: refreshTokenDecoded.email_verified,
        role: refreshTokenDecoded.role,
        created_at: refreshTokenDecoded.created_at,
        updated_at: refreshTokenDecoded.updated_at,
        name: refreshTokenDecoded.name,
        isauth: refreshTokenDecoded.isauth,
      };

      const accessToken = await generateToken(
        userInfo,
        process.env.JWT_ACCESS_TOKEN,
        '1h'
      );

      return accessToken;
    } catch (err) {
      throw err;
    }
  },
};

export default authService;
