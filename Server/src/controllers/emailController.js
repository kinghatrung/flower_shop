import emailService from '../services/emailService.js';

const emailController = {
  sendEmail: async (req, res) => {
    try {
      await emailService.sendEmail(req.body);
      res.status(200).json({ message: 'Gửi email thành công' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default emailController;
