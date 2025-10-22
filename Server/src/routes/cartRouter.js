import { Router } from 'express';

import cartController from '../controllers/cartController.js';

const cartRouter = Router();

// GET /api/cart/:userId - Get product in to cart user
cartRouter.get('/:userId', cartController.getUserProductCart);

// POST /api/cart/create - Create product in to cart user
cartRouter.post('/create', cartController.addProductToCart);

export default cartRouter;
