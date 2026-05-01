import { Router } from 'express';
import reviewController from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const reviewRouter = Router();

// GET /api/reviews/:product_id - Get all reviews by product id
reviewRouter.get('/:product_id', reviewController.findReviewByProductId);

// POST /api/reviews - Create review (authenticated)
reviewRouter.post(
  '/',
  authMiddleware.isAuthorized,
  reviewController.createReview
);

// PATCH /api/reviews/:id - Update review (authenticated)
reviewRouter.patch(
  '/:id',
  authMiddleware.isAuthorized,
  reviewController.updateReview
);

// DELETE /api/reviews/:id - Delete review (authenticated)
reviewRouter.delete(
  '/:id',
  authMiddleware.isAuthorized,
  reviewController.deleteReview
);

export default reviewRouter;
