import HttpStatus from 'http-status-codes';
import * as ticketService from '../services/ticket.service';



/**
 * Controller to getSingleTicket available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getSingleTicket = async (req, res, next) => {
  try {
    const data = await ticketService.getSingleTicket(req.params.CIC_Id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Single Ticket fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new ticket
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createNewTicket = async (req, res, next) => {
    try {
      const data = await ticketService.createNewTicket(req.body.userId,req.body);
      console.log("cont data ----",data);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Ticket created Successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };


  /**
 * Controller to create a new ticket
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const uploadFile =async (req, res, next) => {
  console.log("controller statred");
  try {
    const data = await ticketService.uploadFile(req);
    console.log("upload file  data ----",data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};