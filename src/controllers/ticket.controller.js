import HttpStatus from 'http-status-codes';
import * as ticketService from '../services/ticket.service';



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