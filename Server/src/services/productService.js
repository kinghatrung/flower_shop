import productRepository from '../repositories/productRepository.js';

const productService = {
  getProducts: async (filters) => {
    try {
      const products = await productRepository.getProducts(filters);
      return products;
    } catch (err) {
      throw err;
    }
  },
};

export default productService;
