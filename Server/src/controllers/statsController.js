import statsService from '../services/statsService.js';

const statsController = {
  getOverview: async (req, res) => {
    try {
      const data = await statsService.getOverview();
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getRevenueChart: async (req, res) => {
    try {
      const data = await statsService.getRevenueChart();
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getTopProducts: async (req, res) => {
    try {
      const data = await statsService.getTopProducts();
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getRecentOrders: async (req, res) => {
    try {
      const data = await statsService.getRecentOrders();
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default statsController;
