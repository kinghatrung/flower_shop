import { Router } from 'express';
import upload from '../middleware/multer.js';

import uploadController from '../controllers/uploadController.js';

const uploadRouter = Router();

// POST /api/upload/images - Post images
uploadRouter.post(
  '/images',
  upload.array('images', 5),
  uploadController.uploadImage
);

export default uploadRouter;
