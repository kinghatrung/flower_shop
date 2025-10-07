import bcrypt from 'bcrypt';

import userRepository from '../repositories/userRepository.js';

const userService = {
  getUsers: async (limit, page) => {
    try {
      const users = await userRepository.getUsers(limit, page);
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

  editUser: async (data, id) => {
    try {
      if (data.password && data.rePassword && data.password.length < 8)
        throw new Error('Mật khẩu phải có ít nhất 8 ký tự!');
      if (data.password && data.rePassword && data.password !== data.rePassword)
        throw new Error('Mật khẩu không khớp!');

      let newData = { ...data };

      if (data.password) {
        const hashPassword = await bcrypt.hash(data.password, 10);
        newData = { ...data, password_hash: hashPassword };
        delete newData.password;
        delete newData.rePassword;
      }

      const editNewUser = await userRepository.editUser(newData, id);

      return editNewUser;
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
