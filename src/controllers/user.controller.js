import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all Admin/mentors available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAll = async (req, res, next) => {
  try {
    const data = await UserService.getAll();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All Admin/mentors fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new Admin/mentors
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const registration = async (req, res, next) => {
  try {
    const data = await UserService.registration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Registration completed'
    });
  } catch (error) {
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      message: `${error}`
    });
  }
};

/**
 * Controller to login Admin/mentors
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'login successfully'
      });
    }
  } catch (error) {
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      message: `${error}`
    });
  }
};
