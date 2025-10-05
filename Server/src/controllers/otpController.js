import otpService from '../services/otpService.js';

const otpController = {
  sendOtp: async (req, res) => {
    try {
      const { email } = req.body;
      const result = await otpService.sendOtp(email);

      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default otpController;
