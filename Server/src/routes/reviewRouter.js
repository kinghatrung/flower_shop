import { Router } from 'express';
import reviewController from '../controllers/reviewController.js';

const reviewRouter = Router();

// GET /api/reviews/:product_id - Get all review by product id
reviewRouter.get('/:product_id', reviewController.findReviewByProductId);

export default reviewRouter;
