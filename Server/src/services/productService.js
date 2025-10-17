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

  getProduct: async (id) => {
    try {
      const product = await productRepository.getProduct(id);

      return product;
    } catch (err) {
      throw err;
    }
  },

  createProduct: async (
    name,
    category_id,
    description,
    price,
    original_price,
    is_new,
    is_best_seller
  ) => {
    try {
      const product = await productRepository.createProduct(
        name,
        category_id,
        description,
        price,
        original_price,
        is_new,
        is_best_seller
      );
      return product;
    } catch (err) {
      throw err;
    }
  },
  editProduct: async (
    productId,
    name,
    category_id,
    description,
    price,
    original_price,
    is_new,
    is_best_seller
  ) => {
    try {
      const product = await productRepository.editProduct(
        productId,
        name,
        category_id,
        description,
        price,
        original_price,
        is_new,
        is_best_seller
      );

      return product;
    } catch (err) {
      throw err;
    }
  },
};

export default productService;
