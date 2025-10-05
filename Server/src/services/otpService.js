import { getRedis } from '../config/redis.js';

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const requestOtp = async (email) => {
  const otp = generateOtp();
  const redis = getRedis();

  await redis.set(`reset:otp:${email}`, otp, { EX: 300 });

  // TODO: gửi email thật (ví dụ: nodemailer)
  return otp;
};

const verifyOtpAndResetPassword = async (email, otp, newPassword) => {
  const redis = getRedis();
  const storedOtp = await redis.get(`reset:otp:${email}`);

  if (!storedOtp) {
    throw new Error('OTP hết hạn hoặc chưa được tạo');
  }

  if (storedOtp !== otp) {
    throw new Error('OTP không chính xác');
  }

  // Xoá OTP khi xác thực thành công
  await redis.del(`reset:otp:${email}`);

  // TODO: hash password và update DB
  return true;
};

export { requestOtp, verifyOtpAndResetPassword };
