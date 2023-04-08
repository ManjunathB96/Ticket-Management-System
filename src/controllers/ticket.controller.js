import HttpStatus from 'http-status-codes';
import * as ticketService from '../services/ticket.service';



/**
 * Controller to getSingleTicket available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getTicket = async (req, res, next) => {
  try {
    const data = await ticketService.getTicket(req.params.ticketId);
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
 * Controller to raise a new ticket
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const raiseTicket = async (req, res, next) => {
    try {
      const data = await ticketService.raiseTicket(req.params.cicId,req.body,req.file);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Ticket raised Successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

/**
 * Controller to followUp
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addfollowup = async (req, res, next) => {
  console.log("inside controller ");
  try {
    const data = await ticketService.addfollowup(req.params.ticketId,req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Follow up added successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};