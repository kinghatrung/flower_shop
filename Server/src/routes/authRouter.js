import { Router } from 'express';

import authController from '../controllers/authController.js';

const authRouter = Router();

// POST /api/auth/login - Login user
authRouter.post('/login', authController.loginUser);

// POST /api/auth/google - Login user by google
authRouter.post('/google', authController.loginUserByGoogle);

// POST /api/auth/facebook - Login user by facebook
authRouter.post('/facebook', authController.loginUserByFacebook);

// POST /api/auth/register - Register user
authRouter.post('/register', authController.registerUser);

// DELETE /api/auth/logout - Logout user
authRouter.delete('/logout', authController.logoutUser);

// GET /api/auth/refresh-token - Refresh access token
authRouter.get('/refresh-token', authController.refreshToken);

// POST /api/auth/reset-password - Initiate password reset
authRouter.post('/reset-password', authController.resetPasswordUser);

export default authRouter;
