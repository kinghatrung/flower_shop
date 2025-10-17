import { Router } from 'express';

import emailController from '../controllers/emailController.js';

const emailRouter = Router();

// POST /api/email/send - Send email
emailRouter.post('/send', emailController.sendEmail);

export default emailRouter;
