import { sendEmailContact } from '../utils/mailer.js';

const emailService = {
  sendEmail: async (data) => {
    try {
      await sendEmailContact(data);

      return true;
    } catch (err) {
      throw err;
    }
  },
};

export default emailService;
