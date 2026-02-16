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
};

export default reviewService;
