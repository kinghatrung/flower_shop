import userService from '../services/userService.js';
import bcrypt from 'bcrypt';

const userController = {
  getUsers: async (req, res) => {
    try {
      const {
        limit = 5,
        page = 1,
        role,
        is_active,
        is_verified,
        search,
      } = req.query;

      const filters = {
        role,
        is_active: is_active === undefined ? undefined : is_active === 'true',
        is_verified:
          is_verified === undefined ? undefined : is_verified === 'true',
        search,
      };

      const result = await userService.getUsers(
        Number(limit),
        Number(page),
        filters
      );
      res.status(200).json({
        data: result.users,
        pagination: result.pagination,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  editUser: async (req, res) => {
    try {
      const { id } = req.params;

      const data = req.body;
      const result = await userService.editUser(data, id);

      res
        .status(200)
        .json({ message: 'Sửa thông tin thành công', data: result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getMe: async (req, res) => {
    try {
      const userId = req.jwtDecoded?.user_id;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });
      const user = await userService.getUserById(userId);
      if (!user)
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      res.status(200).json({ data: user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateMe: async (req, res) => {
    try {
      const userId = req.jwtDecoded?.user_id;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });
      const { name, lastname, phone, avatar_url } = req.body;
      const result = await userService.editUser(
        { name, lastName: lastname, phone, avatar_url },
        userId
      );
      res
        .status(200)
        .json({ message: 'Cập nhật thông tin thành công', data: result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const userId = req.jwtDecoded?.user_id;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });
      const { oldPassword, newPassword } = req.body;
      const user = await userService.getUserById(userId);
      if (!user)
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
      if (!isMatch)
        return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
      const hashedPwd = await bcrypt.hash(newPassword, 10);
      await userService.editUser({ password_hash: hashedPwd }, userId);
      res.status(200).json({ message: 'Đổi mật khẩu thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default userController;
