import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get a single user by their user id
router.get('', userAuth, userController.getAll);

//route to create a new user
router.post('', newUserValidator, userController.registration);

//route to login
router.post('/login', userController.login);

export default router;
