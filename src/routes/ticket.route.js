import express from 'express';
import * as ticketController from '../controllers/ticket.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { adminCheck } from '../middlewares/adminCheck.middleware';
import { upload } from '../utils/fileUpload.util';


const router = express.Router();

var type=upload.single('file')


//route for  create_ticket
router.post('/create_ticket',userAuth,adminCheck,ticketController.createNewTicket);

router.put('/images/:CIC_Id',type,userAuth,adminCheck,ticketController.uploadFile);


//route to single ticket
router.get('/single_ticket/:CIC_Id', userAuth, adminCheck, ticketController.getSingleTicket);

export default router;
