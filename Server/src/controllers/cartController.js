import cartService from '../services/cartService.js';

const cartController = {
  getUserProductCart: async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId || isNaN(userId)) {
        return res.status(200).json({ data: [] });
      }

      const items = await cartService.getUserProductCart(userId);

      res.status(200).json({ data: items });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addProductToCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      const item = await cartService.addProductToCart(
        userId,
        productId,
        quantity || 1
      );

      res
        .status(200)
        .json({ message: 'Thêm vào giỏ hàng thành công', data: item });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      await cartService.updateQuantity(userId, productId, quantity);

      res.status(200).json({ message: 'Đổi số lượng thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteProductCart: async (req, res) => {
    try {
      const { userId } = req.body;
      const { productId } = req.params;

      await cartService.deleteProductCart(userId, productId);

      res.status(200).json({ message: 'Đã xóa khỏi giỏ hàng' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default cartController;
