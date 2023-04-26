import HttpStatus from 'http-status-codes';
import * as BatchService from '../services/batch.service';

/**
 * Controller to get all Batches
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllBatchDetails = async (req, res) => {
  try {
    const data = await BatchService.getAllBatchDetails();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All batches fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
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
    const data = await BatchService.createNewBatch(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Batch Created Successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller for add new engineer
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 * */
export const addNewEngineer = async (req, res, next) => {
  console.log("inside controler-----------");
  try {
    const data = await BatchService.addNewEngineer(req.params.batchId,req.body);
    console.log("data-----------",data);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
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


/**
 * Controller to get enginner
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getEngineerDetails= async (req, res, next) => {
  try {
    const data = await BatchService.getEngineerDetails(req.params.cicId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Engineer details fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};