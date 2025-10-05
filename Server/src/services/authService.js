import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

import { getRedis } from '../config/redis.js';
import authRepository from '../repositories/authRepository.js';
import { generateToken, verifyToken } from '../providers/JwtProvider.js';

const client = new OAuth2Client(process.env.GOOGLE_APP_CLIENT_ID);

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

  loginUserByGoogle: async (tokenId) => {
    try {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_APP_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const email = payload.email;

      let user = await authRepository.findUserByEmail(email);

      if (!user) {
        user = await authRepository.createUser(
          payload.given_name,
          payload.family_name,
          payload.email,
          '',
          null,
          payload.picture,
          'GOOGLE'
        );
      }

      const accessToken = await generateToken(
        user,
        process.env.JWT_ACCESS_TOKEN,
        '1h'
      );

      const refreshToken = await generateToken(
        user,
        process.env.JWT_REFRESH_TOKEN,
        '7 days'
      );

      const { password_hash, ...userWithoutPassword } = user;

      return { user: userWithoutPassword, accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  },

  loginUserByFacebook: async (token) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v18.0/me?fields=id,name,email,picture&access_token=${token}`
      );

      const email = response.data.email;
      const picture = response.data.picture;

      let user = await authRepository.findUserByEmail(email);

      if (!user) {
        user = await authRepository.createUser(
          response.data.name,
          '',
          response.data.email,
          '',
          null,
          picture.data.url,
          'FACEBOOK'
        );
      }

      const accessToken = await generateToken(
        user,
        process.env.JWT_ACCESS_TOKEN,
        '1h'
      );

      const refreshToken = await generateToken(
        user,
        process.env.JWT_REFRESH_TOKEN,
        '7 days'
      );

      const { password_hash, ...userWithoutPassword } = user;

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
        phone,
        (avatar = null)
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
        type: refreshTokenDecoded.type,
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

  resetPasswordUser: async (email, password, otp) => {
    try {
      const redisClient = getRedis();
      const otpKey = `otp:email:${email}`;
      const storedOtp = await redisClient.get(otpKey);
      if (!storedOtp || storedOtp !== otp) {
        throw new Error('Otp không hợp lệ hoặc đã hết hạn');
      }

      const user = await authRepository.findUserByEmail(email);
      if (!user) {
        throw new Error('Yêu cầu không thể xử lý');
      }

      if (password.length < 8)
        throw new Error('Mật khẩu phải có ít nhất 8 ký tự!');

      const hashPassword = await bcrypt.hash(password, 10);

      const result = await authRepository.updatePasswordUser(
        email,
        hashPassword
      );

      return result;
    } catch (err) {
      throw err;
    }
  },
};

export default authService;
