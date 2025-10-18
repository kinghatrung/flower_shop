import { promises as fs } from 'fs';
import cloudinary from '../config/cloudinary.js';

const uploadService = {
  uploadImage: async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'BANK',
        format: 'webp',
        resource_type: 'image',
        quality: 'auto:good',
      });

      // Xóa file local sau khi upload thành công
      await fs.unlink(file.path);

      return {
        originalName: file.originalname,
        cloudinaryUrl: result.secure_url,
        publicId: result.public_id,
        size: file.size,
      };
    } catch (err) {
      await fs.unlink(file.path);
      throw err;
    }
  },
};

export default uploadService;
