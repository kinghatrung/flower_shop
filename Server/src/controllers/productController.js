import productService from '../services/productService.js';

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.status(200).json({ data: products });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default productController;
