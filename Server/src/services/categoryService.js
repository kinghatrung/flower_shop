import categoryRepository from '../repositories/categoryRepository.js';

const categoryService = {
  getCategories: async (filters) => {
    try {
      const result = await categoryRepository.getCategories(filters);

      return result;
    } catch (err) {
      throw err;
    }
  },

  createCategory: async (name, type, description) => {
    try {
      await categoryRepository.createCategory(name, type, description);

      return true;
    } catch (err) {
      throw err;
    }
  },

  editCategory: async (id, name, type, description) => {
    try {
      const result = await categoryRepository.editCategoryById(
        id,
        name,
        type,
        description
      );

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
