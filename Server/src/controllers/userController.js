import userService from '../services/userService.js';

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json({ data: users });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default userController;
