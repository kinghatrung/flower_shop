import orderService from '../services/orderService.js';

const orderController = {
  getOrders: async (req, res) => {
    try {
      const orders = await orderService.getOrders();

      res.status(200).json({ data: orders });
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
