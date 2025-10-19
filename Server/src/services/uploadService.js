import cloudinary from '../config/cloudinary.js';
import fs from 'fs/promises';

import uploadRepository from '../repositories/uploadRepository.js';

const uploadService = {
  uploadImages: async (files) => {
    if (!files || files.length === 0) {
      throw new Error('Không có ảnh nào được upload');
    }

    // Upload từng ảnh lên Cloudinary song song
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: process.env.CLOUDINARY_FOLDER_NAME,
        format: 'webp',
        resource_type: 'image',
        quality: 'auto:good',
      })
    );

    const results = await Promise.all(uploadPromises);

    // Xóa file tạm trên disk sau khi upload thành công
    await Promise.all(files.map((file) => fs.unlink(file.path)));

    // Lưu metadata vào DB song song
    const savePromises = results.map((result) =>
      uploadRepository.saveImageMetadata({
        url: result.secure_url,
        publicId: result.public_id,
        productId: null,
        isTemp: true,
      })
    );
    const savedImages = await Promise.all(savePromises);

    return savedImages;
  },
};

export default uploadService;
