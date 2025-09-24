import { Router } from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = Router();

// GET /api/users - Retrieve all users
userRouter.get('/', authMiddleware.isAuthorized, userController.getAllUsers);

export default userRouter;
