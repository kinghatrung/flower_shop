import { Router } from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = Router();

// GET /api/users - Retrieve all users
userRouter.get(
  '/',
  //  authMiddleware.isAuthorized
  userController.getUsers
);

// PATCH / api/auth/edit-user - Edit user information
userRouter.patch('/edit-user/:id', userController.editUser);

export default userRouter;
