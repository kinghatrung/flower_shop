import orderService from '../services/orderService.js';

const orderController = {
  getOrders: async (req, res) => {
    try {
      const { status, search, page = 1, limit = 10 } = req.query;
      const filters = { status: status || 'all', search: search || '' };
      const result = await orderService.getOrders(
        filters,
        Number(page),
        Number(limit)
      );

      res.status(200).json({
        data: result.orders,
        pagination: {
          total: result.total,
          totalPages: result.totalPages,
          currentPage: result.currentPage,
          hasNext: result.hasNext,
          hasPrev: result.hasPrev,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);
      if (!order)
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      res.status(200).json({ data: order });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOrdersByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await orderService.getOrdersByUserId(userId);
      res.status(200).json({ data: orders });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(id, status);
      res
        .status(200)
        .json({ data: order, message: 'Cập nhật trạng thái thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      await orderService.deleteOrder(id);
      res.status(200).json({ message: 'Xóa đơn hàng thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { order, items } = req.body;
      const createdOrder = await orderService.createOrder(order, items);

      res.status(201).json({
        message: 'Đặt hàng thành công',
        data: createdOrder,
        order_code: createdOrder.order_code,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default orderController;
