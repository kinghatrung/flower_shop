import { Router } from 'express';

import otpController from '../controllers/otpController.js';

const otpRouter = Router();

// POST /api/otp/send - Send OTP
otpRouter.post('/send', otpController.sendOtp);

export default otpRouter;
