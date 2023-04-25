import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new users
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userRegistration = async (req, res) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User registration completed'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to user login 
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userLogin = async (req, res) => {
  try {
    const data = await UserService.userLogin(req.body);
    if (data) {
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'login successfully'
      });
    }
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: `${error}`
    });
  }
};
