import productService from '../services/productService.js';

const productController = {
  getProducts: async (req, res) => {
    try {
      const {
        search,
        category_type,
        priceRange,
        status,
        page = 1,
        limit = 5,
      } = req.query;

      const filters = {
        search: search || '',
        category_type: category_type || '',
        priceRange: priceRange || '',
        status: status || '',
      };

      const result = await productService.getProducts(
        filters,
        Number(page),
        Number(limit)
      );
      res
        .status(200)
        .json({ data: result.products, pagination: result.pagination });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const products = await productService.getProductsByCategory(id);

      res.status(200).json({ data: products });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productService.getProduct(id);

      res.status(200).json({ data: product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        name,
        category_id,
        description,
        price,
        original_price,
        is_new,
        is_best_seller,
        images,
      } = req.body;
      const product = await productService.createProduct(
        name,
        category_id,
        description,
        price,
        original_price,
        is_new,
        is_best_seller,
        images
      );

      res
        .status(200)
        .json({ data: product, message: 'Thêm sản phẩm thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  editProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const {
        name,
        category_id,
        description,
        price,
        original_price,
        is_new,
        is_best_seller,
      } = req.body;

      const product = await productService.editProduct(
        productId,
        name,
        category_id,
        description,
        price,
        original_price,
        is_new,
        is_best_seller
      );
      res
        .status(200)
        .json({ data: product, message: 'Sửa sản phẩm thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      await productService.deleteProductById(productId);

      res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default productController;
