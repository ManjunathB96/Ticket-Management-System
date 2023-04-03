import express from 'express';
import * as ticketController from '../controllers/ticket.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { roleCheck } from '../middlewares/roleCheck.middleware';
import { upload } from '../utils/fileUpload.util';


const router = express.Router();

var type=upload.single('file')


//route for  create_ticket
router.post('/raiseNewTicket/:CIC_Id',type,userAuth,roleCheck,ticketController.raiseNewTicket);

//route to single ticket
router.get('/getSingleTicket/:CIC_Id', userAuth, ticketController.getSingleTicket);

export default router;
