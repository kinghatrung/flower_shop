import userService from '../services/userService.js';

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ data: users });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default userController;
