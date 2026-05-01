import reviewService from '../services/reviewService.js';

const reviewController = {
  findReviewByProductId: async (req, res) => {
    try {
      const { product_id } = req.params;
      const reviews = await reviewService.findReviewByProductId(product_id);
      res.status(200).json({ data: reviews });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createReview: async (req, res) => {
    try {
      const { userId, productId, rating, title, comment } = req.body;
      const review = await reviewService.createReview(
        userId,
        productId,
        rating,
        title,
        comment
      );
      res.status(201).json({ data: review, message: 'Đánh giá thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateReview: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, rating, title, comment } = req.body;
      const review = await reviewService.updateReview(
        id,
        userId,
        rating,
        title,
        comment
      );
      if (!review)
        return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
      res
        .status(200)
        .json({ data: review, message: 'Cập nhật đánh giá thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      await reviewService.deleteReview(id, userId);
      res.status(200).json({ message: 'Xóa đánh giá thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default reviewController;
