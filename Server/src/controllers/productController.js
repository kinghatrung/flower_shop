import productService from '../services/productService.js';

const productController = {
  getProducts: async (req, res) => {
    try {
      const { search, category_type, priceRange, status } = req.query;

      const filters = {
        search: search || '',
        category_type: category_type || '',
        priceRange: priceRange || '',
        status: status || '',
      };
      const products = await productService.getProducts(filters);
      res.status(200).json({ data: products });
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
      } = req.body;
      const product = await productService.createProduct(
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
};

export default productController;
