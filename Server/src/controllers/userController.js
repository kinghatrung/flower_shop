import userService from '../services/userService.js';

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
};

export default userController;
