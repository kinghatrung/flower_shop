import { Router } from 'express';

import categoryController from '../controllers/categoryController.js';

const categoryRouter = Router();

// GET /api/categories - Get categories
categoryRouter.get('/', categoryController.getCategories);

// DELETE /api/categories/delete - Delete category
categoryRouter.delete('/delete', categoryController.deleteCategory);

export default categoryRouter;
