import authService from '../services/authService.js';
import dotenv from 'dotenv';
import ms from 'ms';

dotenv.config();

const authController = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser(email, password);
      const { accessToken, refreshToken, ...userWithoutToken } = result;

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ms('14 days'),
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ms('14 days'),
      });

      res.status(200).json({
        message: 'Đăng nhập thành công',
        data: userWithoutToken,
      });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },

  loginUserByGoogle: async (req, res) => {
    try {
      const tokenId = req.body.tokenId;
      const result = await authService.loginUserByGoogle(tokenId);

      const { accessToken, refreshToken, ...userWithoutToken } = result;

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ms('14 days'),
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ms('14 days'),
      });

      res.status(200).json({
        message: 'Đăng nhập bằng Google thành công',
        data: userWithoutToken,
      });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },

  loginUserByFacebook: async (req, res) => {
    try {
      const token = req.body.accessToken;
      const result = await authService.loginUserByFacebook(token);
      const { accessToken, refreshToken, ...userWithoutToken } = result;

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ms('14 days'),
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ms('14 days'),
      });

      res.status(200).json({
        message: 'Đăng nhập bằng Facebook thành công',
        data: userWithoutToken,
      });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },

  registerUser: async (req, res) => {
    try {
      const { name, lastName, email, password, rePassword, phone } = req.body;
      const newUser = await authService.registerUser(
        name,
        lastName,
        email,
        password,
        rePassword,
        phone
      );

      res.status(201).json({
        message: 'Đăng kí thành công!',
        data: newUser,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  logoutUser: async (req, res) => {
    try {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.status(200).json({ message: 'Đăng xuất thành công!' });
    } catch (err) {
      req.status(500).json({ message: err.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const result = await authService.refreshToken(req.cookies?.refreshToken);
      res.cookie('accessToken', result, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ms('14 days'),
      });

      res
        .status(200)
        .json({ message: 'Làm mới token thành công', data: result });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },

  resetPasswordUser: async (req, res) => {
    try {
      const { email, otp, password } = req.body;
      await authService.resetPasswordUser(email, password, otp);
      res.status(200).json({ message: 'Đặt lại mật khẩu thành công' });
    } catch (err) {
      req.status(500).json({ message: err.message });
    }
  },
};

export default authController;
