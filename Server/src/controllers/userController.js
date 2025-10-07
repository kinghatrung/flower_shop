import userService from '../services/userService.js';

const userController = {
  getUsers: async (req, res) => {
    try {
      const { limit = 5, page = 1 } = req.query;

      const users = await userService.getUsers(limit, page);
      res.status(200).json({ data: users });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default userController;
