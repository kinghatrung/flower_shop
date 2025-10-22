import cartRepository from '../repositories/cartRepository.js';

const cartService = {
  getUserProductCart: async (userId) => {
    try {
      const items = await cartRepository.getUserProductCart(userId);

      return items;
    } catch (err) {
      throw err;
    }
  },

  addProductToCart: async (userId, productId, quantity) => {
    try {
      const item = await cartRepository.addProductToCart(
        userId,
        productId,
        quantity
      );

      return item;
    } catch (err) {
      throw err;
    }
  },

  updateQuantity: async (userId, productId, quantity) => {
    try {
      await cartRepository.updateQuantity(userId, productId, quantity);

      return;
    } catch (err) {
      throw err;
    }
  },

  deleteProductCart: async (userId, productId) => {
    try {
      await cartRepository.deleteProductCart(userId, productId);

      return;
    } catch (err) {
      throw err;
    }
  },
};

export default cartService;
