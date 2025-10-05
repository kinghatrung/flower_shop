import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_GOOGLE_APP,
    pass: process.env.EMAIL_GOOGLE_PASSWORD,
  },
});

export const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Mã OTP để đặt lại mật khẩu',
    text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 10 phút.`,
    html: `<p>Mã OTP của bạn là: <strong>${otp}</strong>. Mã này có hiệu lực trong 10 phút.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
