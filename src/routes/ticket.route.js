import express from 'express';
import * as ticketController from '../controllers/ticket.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { roleCheck } from '../middlewares/roleCheck.middleware';
import { upload } from '../utils/fileUpload.util';
import { ticketValidator } from '../validators/ticket.validator';
const router = express.Router();
let uploadFile=upload.single('file')


//route for  create_ticket
router.post('/:cicId',uploadFile,ticketValidator,userAuth,ticketController.raiseTicket);

//route to add follow up
router.put('/addFollowup/:ticketId',userAuth,roleCheck,ticketController.addfollowup);

//route to get single ticket
router.get('/:ticketId', userAuth, ticketController.getTicketDetails);

export default router;
