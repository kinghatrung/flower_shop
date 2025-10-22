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
};

export default cartService;
