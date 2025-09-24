import { verifyToken } from '../providers/JwtProvider.js';

// Middleware này sẽ đảm nhiệm việc quan trọng: Lấy và xác thực JWT accessToken nhận được từ phía FE có hợp lệ hay không

const authMiddleware = {
  isAuthorized: async (req, res, next) => {
    const accessTokenFromCookie = req.cookies?.accessToken;
    //   Status 401: Unauthorized
    if (!accessTokenFromCookie) {
      res.status(401).json({ message: 'Không tìm thấy Token!' });
      return;
    }

    try {
      // Giải mã token coi có hợp lệ hay không
      const accessTokenDecoded = await verifyToken(
        accessTokenFromCookie,
        process.env.JWT_ACCESS_TOKEN
      );

      // Nếu hợp lệ cẩn phải lưu thông tin giải mã được vào req.jwtDecoded, để xử dụng
      // cho các tầng lớp phía sau
      req.jwtDecoded = accessTokenDecoded;
      next();
    } catch (error) {
      // Có 2 TH: 1 là token hết hạn -> Mã GONE - 410,
      if (error.message?.includes('jwt expired'))
        return res.status(410).json({ message: 'Token expired' });
      // 2 là token không hợp lệ -> 401 cho phía FE xử lý logout
      res.status(401).json({ message: 'Unauthorized' });
    }
  },
};

export default authMiddleware;
