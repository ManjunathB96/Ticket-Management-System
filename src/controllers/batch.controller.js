import HttpStatus from 'http-status-codes';
import * as BatchService from '../services/batch.service';

/**
 * Controller to get all Batch  available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAll = async (req, res, next) => {
    try {
      const data = await BatchService.getAll();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All batch  fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };


/**
 * Controller to create a new Batch 
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createNewBatch = async (req, res, next) => {
  try {
    const data = await BatchService.createNewBatch(req.body.userId,req.body);
    console.log("cont data ----",data);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Batches Created Successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};



/**
 * Controller for add new enginees
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 * */
export const addNewEngineer = async (req, res, next) => {
  try {
    const data = await BatchService.addNewEngineer(req);
    console.log('engg controller --->', data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Engineer added successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};




