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
    subject: 'Mã OTP để đặt lại mật khẩu - Nuvexa Luxury Flowers',
    text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 5 phút.`,
    html: `
      <!DOCTYPE html>
      <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mã OTP - Nuvexa Luxury Flowers</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #fef3f5 0%, #f5e6f8 100%); min-height: 100vh;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #fef3f5 0%, #f5e6f8 100%); padding: 40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(139, 92, 246, 0.15);">
                  <tr>
                    <td style="background: linear-gradient(135deg, #f8c8d3 0%, #c084fc 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.1); letter-spacing: -0.5px;">
                        🌸 Nuvexa Luxury Flowers
                      </h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.95); font-size: 16px; font-weight: 500;">
                        Nơi mỗi bông hoa kể một câu chuyện
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 50px 40px;">
                      <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 26px; font-weight: 700; text-align: center;">
                        Đặt lại mật khẩu của bạn
                      </h2>
                      
                      <p style="margin: 0 0 30px 0; color: #6b7280; font-size: 16px; line-height: 1.6; text-align: center;">
                        Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Vui lòng sử dụng mã OTP bên dưới để tiếp tục:
                      </p>

                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 30px 0;">
                        <tr>
                          <td align="center">
                            <div style="background: linear-gradient(135deg, #fef3f5 0%, #f5e6f8 100%); border: 3px dashed #f8c8d3; border-radius: 16px; padding: 30px; display: inline-block;">
                              <p style="margin: 0 0 10px 0; color: #8b5cf6; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                Mã OTP của bạn
                              </p>
                              <p style="margin: 0; color: #1f2937; font-size: 48px; font-weight: 800; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                ${otp}
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" style="width: 100%; border-collapse: collapse; background: #fef3f5; border-left: 4px solid #f8c8d3; border-radius: 8px; padding: 20px; margin: 0 0 30px 0;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 10px 0; color: #1f2937; font-size: 15px; font-weight: 600;">
                              ⏰ Lưu ý quan trọng:
                            </p>
                            <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                              <li style="margin-bottom: 8px;">Mã OTP này có hiệu lực trong <strong style="color: #f8c8d3;">10 phút</strong></li>
                              <li style="margin-bottom: 8px;">Không chia sẻ mã này với bất kỳ ai</li>
                              <li>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này</li>
                            </ul>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center;">
                        Nếu bạn gặp bất kỳ vấn đề nào, đừng ngần ngại liên hệ với chúng tôi qua email 
                        <a href="mailto:support@bloomflowers.vn" style="color: #f8c8d3; text-decoration: none; font-weight: 600;">support@bloomflowers.vn</a>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 30px 40px; text-align: center;">
                      <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                        Nuvexa Luxury Flowers
                      </p>
                      
                      <p style="margin: 0 0 15px 0; color: #d1d5db; font-size: 14px; line-height: 1.6;">
                        📍 Mễ Trì Thượng, Quận Từ Liêm, Hà Nội<br>
                        📞 0961 753 837 | 📧 myzlucky2706@gmail.com
                      </p>

                      <div style="margin: 20px 0 0 0;">
                        <a href="#" style="display: inline-block; margin: 0 8px; color: #f8c8d3; text-decoration: none; font-size: 24px;">📘</a>
                        <a href="#" style="display: inline-block; margin: 0 8px; color: #f8c8d3; text-decoration: none; font-size: 24px;">📷</a>
                        <a href="#" style="display: inline-block; margin: 0 8px; color: #f8c8d3; text-decoration: none; font-size: 24px;">🐦</a>
                      </div>

                      <p style="margin: 20px 0 0 0; color: #9ca3af; font-size: 12px;">
                        © 2025 Nuvexa Luxury Flowers. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendEmailContact = async (data) => {
  const { name, phone, email, subject, message } = data;

  const sendEmailOption = {
    from: email,
    to: process.env.CONTACT_EMAIL_RECIPIENT || 'info@bloomflowers.vn',
    replyTo: email,
    subject: `Tin nhắn liên hệ từ ${name} - Nuvexa Luxury Flowers`,
    text: `Tên: ${name}\nEmail: ${email}\nSố điện thoại: ${phone}\nChủ đề: ${subject}\n\nTin nhắn:\n${message}`,
    html: `
      <!DOCTYPE html>
      <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tin nhắn liên hệ - Nuvexa Luxury Flowers</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #fef3f5 0%, #f5e6f8 100%); min-height: 100vh;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #fef3f5 0%, #f5e6f8 100%); padding: 40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(139, 92, 246, 0.15);">
                  <tr>
                    <td style="background: linear-gradient(135deg, #f8c8d3 0%, #c084fc 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.1); letter-spacing: -0.5px;">
                        🌸 Nuvexa Luxury Flowers
                      </h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.95); font-size: 16px; font-weight: 500;">
                        Nơi mỗi bông hoa kể một câu chuyện
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 50px 40px;">
                      <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 26px; font-weight: 700; text-align: center;">
                        Tin nhắn liên hệ mới
                      </h2>
                      
                      <p style="margin: 0 0 30px 0; color: #6b7280; font-size: 16px; line-height: 1.6; text-align: center;">
                        Bạn đã nhận được một tin nhắn liên hệ từ khách hàng. Dưới đây là chi tiết:
                      </p>

                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 30px 0; background: #fef3f5; border-radius: 12px; padding: 24px;">
                        <tr>
                          <td style="padding: 0;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f5e6f8;">
                                  <p style="margin: 0 0 4px 0; color: #8b5cf6; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Tên khách hàng
                                  </p>
                                  <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                                    ${name}
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f5e6f8;">
                                  <p style="margin: 0 0 4px 0; color: #8b5cf6; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Email
                                  </p>
                                  <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                                    <a href="mailto:${email}" style="color: #f8c8d3; text-decoration: none;">
                                      ${email}
                                    </a>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f5e6f8;">
                                  <p style="margin: 0 0 4px 0; color: #8b5cf6; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Số điện thoại
                                  </p>
                                  <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                                    <a href="tel:${phone}" style="color: #f8c8d3; text-decoration: none;">
                                      ${phone}
                                    </a>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0;">
                                  <p style="margin: 0 0 4px 0; color: #8b5cf6; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Chủ đề
                                  </p>
                                  <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                                    ${subject}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" style="width: 100%; border-collapse: collapse; background: #fef3f5; border-left: 4px solid #f8c8d3; border-radius: 8px; padding: 20px; margin: 0 0 30px 0;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 10px 0; color: #1f2937; font-size: 15px; font-weight: 600;">
                              💬 Tin nhắn:
                            </p>
                            <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.8; white-space: pre-wrap; word-wrap: break-word;">
                              ${message}
                            </p>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center;">
                        Vui lòng phản hồi khách hàng trong thời gian sớm nhất. Bạn có thể trả lời trực tiếp qua email hoặc liên hệ qua số điện thoại được cung cấp.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 30px 40px; text-align: center;">
                      <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                        Nuvexa Luxury Flowers
                      </p>
                      
                      <p style="margin: 0 0 15px 0; color: #d1d5db; font-size: 14px; line-height: 1.6;">
                        📍 Mễ Trì Thượng, Quận Từ Liêm, Hà Nội<br>
                        📞 0961 753 837 | 📧 myzlucky2706@gmail.com
                      </p>

                      <div style="margin: 20px 0 0 0;">
                        <a href="#" style="display: inline-block; margin: 0 8px; color: #f8c8d3; text-decoration: none; font-size: 24px;">📘</a>
                        <a href="#" style="display: inline-block; margin: 0 8px; color: #f8c8d3; text-decoration: none; font-size: 24px;">📷</a>
                        <a href="#" style="display: inline-block; margin: 0 8px; color: #f8c8d3; text-decoration: none; font-size: 24px;">🐦</a>
                      </div>

                      <p style="margin: 20px 0 0 0; color: #9ca3af; font-size: 12px;">
                        © 2025 Nuvexa Luxury Flowers. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(sendEmailOption);
};

export const sendOrderSuccessEmail = async (
  orderData,
  cartItems,
  totalAmount,
  orderCode
) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: orderData.email,
    subject: `Đơn hàng ${orderCode} của bạn đã được đặt thành công`,
    text: `Xin chào ${orderData.fullName}, đơn hàng ${orderCode} của bạn đã được đặt thành công.`,
    html: `
      <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Đơn hàng thành công - Nuvexa Luxury Flowers</title>
        </head>
        <body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fef3f5; min-height:100vh;">

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:40px 20px; background: linear-gradient(135deg, #fef3f5 0%, #f5e6f8 100%);">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" style="max-width:600px; border-collapse:collapse; background:#ffffff; border-radius:24px; overflow:hidden; box-shadow:0 20px 60px rgba(139,92,246,0.15);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg, #f8c8d3 0%, #c084fc 100%); padding:40px 30px; text-align:center;">
                      <h1 style="margin:0; font-size:32px; font-weight:700; color:#fff; text-shadow:0 2px 10px rgba(0,0,0,0.1);">🌸 Nuvexa Luxury Flowers</h1>
                      <p style="margin:10px 0 0 0; font-size:16px; font-weight:500; color:rgba(255,255,255,0.95);">Nơi mỗi bông hoa kể một câu chuyện</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:50px 40px;">
                      <h2 style="margin:0 0 10px 0; font-size:26px; font-weight:700; color:#1f2937; text-align:center;">✅ Đơn hàng đã được đặt thành công</h2>
                      <p style="margin:0 0 30px 0; font-size:16px; color:#6b7280; text-align:center;">Cảm ơn bạn, ${orderData.fullName}! Đơn hàng của bạn đã được xác nhận và sẽ được xử lý sớm.</p>

                      <!-- Order Info -->
                      <table role="presentation" width="100%" style="border-collapse:collapse; background:#fef3f5; border-radius:12px; padding:24px; margin-bottom:30px;">
                        <tr>
                          <td style="padding:0;">
                            <table role="presentation" width="100%" style="border-collapse:collapse;">
                              <tr>
                                <td style="padding:12px 0; border-bottom:1px solid #f5e6f8;">
                                  <p style="margin:0 0 4px 0; font-size:12px; font-weight:700; color:#8b5cf6; text-transform:uppercase;">Mã đơn hàng</p>
                                  <p style="margin:0; font-size:16px; font-weight:600; color:#1f2937;">${orderCode}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:12px 0; border-bottom:1px solid #f5e6f8;">
                                  <p style="margin:0 0 4px 0; font-size:12px; font-weight:700; color:#8b5cf6; text-transform:uppercase;">Họ tên khách hàng</p>
                                  <p style="margin:0; font-size:16px; font-weight:600; color:#1f2937;">${orderData.fullName}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:12px 0; border-bottom:1px solid #f5e6f8;">
                                  <p style="margin:0 0 4px 0; font-size:12px; font-weight:700; color:#8b5cf6; text-transform:uppercase;">Số điện thoại</p>
                                  <p style="margin:0; font-size:16px; font-weight:600; color:#1f2937;">${orderData.phone}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:12px 0; border-bottom:1px solid #f5e6f8;">
                                  <p style="margin:0 0 4px 0; font-size:12px; font-weight:700; color:#8b5cf6; text-transform:uppercase;">Email</p>
                                  <p style="margin:0; font-size:16px; font-weight:600; color:#1f2937;">${orderData.email}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:12px 0; border-bottom:1px solid #f5e6f8;">
                                  <p style="margin:0 0 4px 0; font-size:12px; font-weight:700; color:#8b5cf6; text-transform:uppercase;">Địa chỉ giao hàng</p>
                                  <p style="margin:0; font-size:16px; font-weight:600; color:#1f2937;">${orderData.address}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:12px 0;">
                                  <p style="margin:0 0 4px 0; font-size:12px; font-weight:700; color:#8b5cf6; text-transform:uppercase;">Phương thức thanh toán</p>
                                  <p style="margin:0; font-size:16px; font-weight:600; color:#1f2937;">${orderData.payment_method}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Cart Items -->
                      <table role="presentation" width="100%" style="border-collapse:collapse; background:#fef3f5; border-left:4px solid #f8c8d3; border-radius:8px; padding:20px; margin-bottom:30px;">
                        <tr>
                          <td>
                            <p style="margin:0 0 15px 0; font-size:15px; font-weight:600; color:#1f2937;">📦 Danh sách sản phẩm:</p>
                            <table role="presentation" width="100%" style="border-collapse:collapse;">
                              ${cartItems
                                .map(
                                  (item) => `
                                <tr>
                                  <td style="padding:12px 0; border-bottom:1px solid #f5e6f8; vertical-align:top;">
                                    ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-right:12px;display:inline-block;vertical-align:top;">` : ''}
                                    <div style="display:inline-block; vertical-align:top; width:calc(100% - 100px);">
                                      <p style="margin:0 0 4px 0; font-size:14px; font-weight:600; color:#1f2937;">${item.name}</p>
                                      <p style="margin:0 0 4px 0; font-size:13px; color:#6b7280;">Số lượng: <strong>${item.quantity}</strong></p>
                                      <p style="margin:0; font-size:14px; font-weight:600; color:#8b5cf6;">${item.price.toLocaleString('vi-VN', { maximumFractionDigits: 0 })} VNĐ</p>
                                    </div>
                                  </td>
                                </tr>`
                                )
                                .join('')}
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Total Amount -->
                      <table role="presentation" width="100%" style="border-collapse:collapse; background:#f3f4f6; border-radius:8px; padding:20px; margin-bottom:30px;">
                        <tr>
                          <td style="text-align:right;">
                            <p style="margin:0 0 10px 0; font-size:14px; color:#6b7280;">Tổng cộng:</p>
                            <p style="margin:0; font-size:24px; font-weight:700; color:#8b5cf6;">${totalAmount.toLocaleString('vi-VN', { maximumFractionDigits: 0 })} VNĐ</p>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280; text-align:center;">Bạn sẽ nhận được email cập nhật về tình trạng đơn hàng của mình. Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:linear-gradient(135deg, #1f2937 0%, #374151 100%); padding:30px 40px; text-align:center;">
                      <p style="margin:0 0 15px 0; font-size:16px; font-weight:600; color:#fff;">Nuvexa Luxury Flowers</p>
                      <p style="margin:0 0 15px 0; font-size:14px; line-height:1.6; color:#d1d5db;">
                        📍 Mễ Trì Thượng, Quận Từ Liêm, Hà Nội<br>
                        📞 0961 753 837 | 📧 myzlucky2706@gmail.com
                      </p>
                      <div style="margin:20px 0 0 0;">
                        <a href="#" style="margin:0 8px; color:#f8c8d3; text-decoration:none; font-size:24px;">📘</a>
                        <a href="#" style="margin:0 8px; color:#f8c8d3; text-decoration:none; font-size:24px;">📷</a>
                        <a href="#" style="margin:0 8px; color:#f8c8d3; text-decoration:none; font-size:24px;">🐦</a>
                      </div>
                      <p style="margin:20px 0 0 0; font-size:12px; color:#9ca3af;">© 2025 Nuvexa Luxury Flowers. All rights reserved.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};
