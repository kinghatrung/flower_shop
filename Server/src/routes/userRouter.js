import { Router } from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = Router();

// GET /api/users/me - Get current user profile
userRouter.get('/me', authMiddleware.isAuthorized, userController.getMe);

// PATCH /api/users/me - Update current user profile
userRouter.patch('/me', authMiddleware.isAuthorized, userController.updateMe);

// PATCH /api/users/me/password - Change password
userRouter.patch(
  '/me/password',
  authMiddleware.isAuthorized,
  userController.changePassword
);

// GET /api/users - Retrieve all users
userRouter.get('/', userController.getUsers);

// PATCH /api/users/edit/:id - Edit user information (admin)
userRouter.patch('/edit/:id', userController.editUser);

export default userRouter;
