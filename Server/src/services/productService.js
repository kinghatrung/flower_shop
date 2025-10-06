import productRepository from '../repositories/productRepository.js';

const productService = {
  getProducts: async () => {
    try {
      const products = await productRepository.getProducts();
      return products;
    } catch (err) {
      throw err;
    }
  },
};

export default productService;
