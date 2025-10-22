import { Router } from 'express';

import cartController from '../controllers/cartController.js';

const cartRouter = Router();

// GET /api/cart/:userId - Get product in to cart user
cartRouter.get('/:userId', cartController.getUserProductCart);

// POST /api/cart/create - Create product in to cart user
cartRouter.post('/create', cartController.addProductToCart);

// PUT /api/cart/update - Update product in to cart user
cartRouter.put('/update', cartController.updateQuantity);

// DELETE /api/cart/delete/:productId - Delete product in to cart user
cartRouter.delete('/delete/:productId', cartController.deleteProductCart);

export default cartRouter;
