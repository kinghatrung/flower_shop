import statsRepository from '../repositories/statsRepository.js';

const statsService = {
  getOverview: async () => {
    try {
      return await statsRepository.getOverview();
    } catch (err) {
      throw err;
    }
  },

  getRevenueChart: async () => {
    try {
      return await statsRepository.getRevenueChart();
    } catch (err) {
      throw err;
    }
  },

  getTopProducts: async () => {
    try {
      return await statsRepository.getTopProducts();
    } catch (err) {
      throw err;
    }
  },

  getRecentOrders: async () => {
    try {
      return await statsRepository.getRecentOrders();
    } catch (err) {
      throw err;
    }
  },
};

export default statsService;
