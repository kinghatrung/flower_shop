import categoryService from '../services/categoryService.js';

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await categoryService.getCategories();

      res.status(200).json({ data: categories });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { type } = req.body;
      await categoryService.deleteCategory(type);

      res.status(200).json({ message: 'Xóa danh mục thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default categoryController;
