import HttpStatus from 'http-status-codes';
import * as ticketService from '../services/ticket.service';



/**
 * Controller to getSingleTicket available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getSingleTicket = async (req, res, next) => {
  console.log("get into controller");
  try {
    const data = await ticketService.getSingleTicket(req.params.Ticket_Id);
    console.log("data ===--->",data);
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
export const raiseNewTicket = async (req, res, next) => {
    try {
      const data = await ticketService.raiseNewTicket(req);
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
export const followUp = async (req, res, next) => {
  console.log("inside controller ");
  try {
    const data = await ticketService.followUp(req);
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