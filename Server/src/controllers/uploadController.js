import multer from 'multer';

import uploadService from '../services/uploadService.js';

// Cấu hình Multer: Lưu file vào thư mục 'uploads/' với tên gốc + timestamp
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Thêm timestamp để tránh trùng tên
  },
});

// Filter để chỉ chấp nhận file ảnh (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file ảnh JPG hoặc PNG'), false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadController = {
  uploadImage: [
    upload.array('images', 10), // 'images' là tên field, hỗ trợ nhiều file (max 10)
    async (req, res) => {
      try {
        if (!req.files || req.files.length === 0) {
          return res
            .status(400)
            .json({ error: 'Không có file ảnh nào được upload' });
        }

        // Gọi service để xử lý từng file
        const results = await Promise.all(
          req.files.map((file) => uploadService.uploadImage(file))
        );

        res.status(200).json({
          message: 'Upload ảnh thành công',
          files: results,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
  ],
};

export default uploadController;
