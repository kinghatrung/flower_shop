import productService from '../services/productService.js';

const productController = {
  getProducts: async (req, res) => {
    try {
      const { search, category_type, priceRange } = req.query;

      const filters = {
        search: search || '',
        category_type: category_type || '',
        priceRange: priceRange || '',
      };
      const products = await productService.getProducts(filters);
      res.status(200).json({ data: products });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default productController;
