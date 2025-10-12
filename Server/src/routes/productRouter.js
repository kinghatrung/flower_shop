import { Router } from 'express';

import productController from '../controllers/productController.js';

const productRouter = Router();

// GET /api/products - Get all products
productRouter.get('/', productController.getProducts);

// POST /api/products/post - Create product
productRouter.post('/post', productController.createProduct);

// PATCH /api/products/post - Edit product
productRouter.patch('/edit/:productId', productController.editProduct);

export default productRouter;
