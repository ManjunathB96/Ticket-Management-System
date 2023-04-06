import express from 'express';
import * as ticketController from '../controllers/ticket.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { roleCheck } from '../middlewares/roleCheck.middleware';
import { upload } from '../utils/fileUpload.util';
const router = express.Router();
let uploadFile=upload.single('file')


//route for  create_ticket
router.post('/raiseTicket/:cicId',uploadFile,userAuth,ticketController.raiseTicket);

//route to add follow up
router.put('/addFollowUP/:ticketId',userAuth,roleCheck,ticketController.followUp);

//route to single ticket
router.get('/getTicket/:ticketId', userAuth, ticketController.getTicket);

export default router;
