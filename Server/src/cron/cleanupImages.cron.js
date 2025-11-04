import cron from 'node-cron';
import uploadService from '../services/uploadService.js';

// Chạy vào phút 0 của mỗi h
cron.schedule('0 * * * *', async () => {
  console.log('🕐 [CRON] Bắt đầu dọn ảnh tạm...');
  try {
    await uploadService.deleteTempImages();
    console.log('✅ [CRON] Hoàn thành dọn ảnh tạm.');
  } catch (err) {
    console.error('❌ [CRON] Lỗi khi xoá ảnh tạm:', err.message);
  }
});
