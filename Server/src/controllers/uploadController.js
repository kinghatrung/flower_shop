import uploadService from '../services/uploadService.js';

const uploadController = {
  uploadImage: async (req, res) => {
    try {
      const results = await uploadService.uploadImages(req.files);
      res.status(200).json({
        message: 'Tải ảnh thành công',
        data: results,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Tải ảnh thất bại' });
    }
  },
};

export default uploadController;
