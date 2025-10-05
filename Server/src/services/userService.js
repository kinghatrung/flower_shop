import userRepository from '../repositories/userRepository.js';

const userService = {
  getUsers: async () => {
    try {
      const users = await userRepository.getUsers();
      return users;
    } catch (err) {
      throw err;
    }
  },

  getUser: async (email) => {
    try {
      const user = await userRepository.getUserByEmail(email);
      return user;
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
