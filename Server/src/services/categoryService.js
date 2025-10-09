import categoryRepository from '../repositories/categoryRepository.js';

const categoryService = {
  getCategories: async () => {
    try {
      const result = await categoryRepository.getCategories();

      return result;
    } catch (err) {
      throw err;
    }
  },
  deleteCategory: async (type) => {
    try {
      await categoryRepository.deleteCategoryByType(type);
      return true;
    } catch (err) {
      throw err;
    }
  },
};

export default categoryService;
