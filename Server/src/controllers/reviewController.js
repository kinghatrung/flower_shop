import reviewService from '../services/reviewService.js';

const reviewController = {
  findReviewByProductId: async (req, res) => {
    try {
      const { product_id } = req.params;
      const reviews = await reviewService.findReviewByProductId(product_id);

      res.status(200).json({ data: reviews });
    } catch (error) {}
  },
};

export default reviewController;
