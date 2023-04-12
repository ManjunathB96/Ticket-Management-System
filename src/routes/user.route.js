import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { loginValidator } from '../validators/login.validator';

const router = express.Router();

//route to get a single user details
router.get('', userAuth, userController.getAllUsers);

//route to create a new user
router.post('', newUserValidator, userController.userRegistration);

//route to login
router.post('/login',loginValidator, userController.userLogin);

export default router;
