import { Router } from 'express';

import productController from '../controllers/productController.js';

const productRouter = Router();

// GET /api/products - Get all products
productRouter.get('/', productController.getProducts);

// GET /api/products - Get all products
// productRouter.get('/', productController.getProducts);

export default productRouter;
