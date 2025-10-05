import crypto from 'crypto';

import authRepository from '../repositories/authRepository.js';
import { sendOtpEmail } from '../utils/mailer.js';
import { getRedis } from '../config/redis.js';

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const otpService = {
  sendOtp: async (email) => {
    const otp = generateOtp();
    const redisClient = getRedis();
    const otpKey = `otp:email:${email}`;
    await redisClient.set(otpKey, otp, { EX: 300 }); // Hết hạn sau 5 phút// Gửi OTP qua email
    await sendOtpEmail(email, otp);

    return { message: 'OTP đã được gửi đến email của bạn' };
  },
};

export default otpService;
