import reviewRepository from '../repositories/reviewRepository.js';

const reviewService = {
  findReviewByProductId: async (product_id) => {
    try {
      const result = await reviewRepository.findReviewByProductId(product_id);
      return result;
    } catch (err) {
      throw err;
    }
  },

  createReview: async (userId, productId, rating, title, comment) => {
    try {
      return await reviewRepository.createReview(
        userId,
        productId,
        rating,
        title,
        comment
      );
    } catch (err) {
      throw err;
    }
  },

  updateReview: async (id, userId, rating, title, comment) => {
    try {
      return await reviewRepository.updateReview(
        id,
        userId,
        rating,
        title,
        comment
      );
    } catch (err) {
      throw err;
    }
  },

  deleteReview: async (id, userId) => {
    try {
      return await reviewRepository.deleteReview(id, userId);
    } catch (err) {
      throw err;
    }
  },
};

export default reviewService;
