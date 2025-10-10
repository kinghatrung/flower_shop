import { Router } from 'express';

import categoryController from '../controllers/categoryController.js';

const categoryRouter = Router();

// GET /api/categories - Get categories
categoryRouter.get('/', categoryController.getCategories);

// POST /api/categories/post - Create category
categoryRouter.post('/post', categoryController.createCategory);

// PATCH /api/categories/edit/:id - Edit category
categoryRouter.patch('/edit/:id', categoryController.editCategory);

// DELETE /api/categories/delete - Delete category
categoryRouter.delete('/delete', categoryController.deleteCategory);

export default categoryRouter;
