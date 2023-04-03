import express from 'express';
import * as ticketController from '../controllers/ticket.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { adminCheck } from '../middlewares/adminCheck.middleware';


const router = express.Router();


//route for  create_ticket
router.post('/create_ticket',userAuth,adminCheck,ticketController.createNewTicket);


export default router;
