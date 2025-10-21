import productRepository from '../repositories/productRepository.js';
import { slugify } from '../utils/slugify.js';

const productService = {
  getProducts: async (filters, page, limit) => {
    try {
      const { products, total, totalPages, currentPage } =
        await productRepository.getProducts(filters, page, limit);
      return {
        products,
        pagination: {
          currentPage,
          totalPages,
          totalProducts: total,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (err) {
      throw err;
    }
  },

  getProductsAll: async () => {
    try {
      const result = await productRepository.getProductsAll();

      return result;
    } catch (err) {
      throw err;
    }
  },

  getProductsByCategory: async (id) => {
    try {
      const products = await productRepository.getProductsByCategory(id);

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
    is_best_seller,
    images
  ) => {
    try {
      const slug = slugify(name);

      const product = await productRepository.createProduct(
        name,
        category_id,
        description,
        price,
        original_price,
        is_new,
        is_best_seller,
        slug,
        images
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
      const slug = name ? slugify(name) : '';

      const product = await productRepository.editProduct(
        productId,
        name,
        category_id,
        description,
        price,
        original_price,
        is_new,
        is_best_seller,
        slug
      );

      return product;
    } catch (err) {
      throw err;
    }
  },

  deleteProductById: async (productId) => {
    try {
      await productRepository.deleteProductById(productId);

      return;
    } catch (err) {
      throw err;
    }
  },
};

export default productService;
