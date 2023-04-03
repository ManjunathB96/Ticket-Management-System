import express from 'express';
import * as batchController from '../controllers/batch.controller';
import { newBatchValidator } from '../validators/batch.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { adminCheck } from '../middlewares/adminCheck.middleware';

const router = express.Router();

//route to all batches
router.get('', userAuth, adminCheck, batchController.getAll);

//route to create a new batch
router.post('',newBatchValidator,userAuth,adminCheck,batchController.createNewBatch);

//route for  add new Engineer
router.put('/add_engineers',userAuth,adminCheck,batchController.addNewEngineer);



export default router;
