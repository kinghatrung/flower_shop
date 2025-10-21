import { Router } from 'express';

import productController from '../controllers/productController.js';

const productRouter = Router();

// GET /api/products - Get all products
productRouter.get('/', productController.getProducts);

// GET /api/products/all - Get all products
productRouter.get('/all', productController.getProductsAll);

// GET /api/products/category/:id - Get products by category Id
productRouter.get('/category/:id', productController.getProductsByCategory);

// GET /api/product - Get product
productRouter.get('/product/:id', productController.getProduct);

// POST /api/products/post - Create product
productRouter.post('/post', productController.createProduct);

// PATCH /api/products/post - Edit product
productRouter.patch('/edit/:productId', productController.editProduct);

// PATCH /api/products/delete/:productId - Delete product
productRouter.delete('/delete/:productId', productController.deleteProductById);

export default productRouter;
