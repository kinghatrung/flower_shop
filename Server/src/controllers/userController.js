import userService from '../services/userService.js';

const userController = {
  getUsers: async (req, res) => {
    try {
      const { limit = 5, page = 1 } = req.query;

      const result = await userService.getUsers(Number(limit), Number(page));
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
};

export default userController;
