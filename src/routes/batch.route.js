import express from 'express';
import * as batchController from '../controllers/batch.controller';
import { newBatchValidator } from '../validators/batch.validator';
import { userAuth } from '../middlewares/auth.middleware';
const router = express.Router();
import { roleCheck } from '../middlewares/roleCheck.middleware';

//route to all batches
router.get('', userAuth, batchController.getAll);

//route to create a new batch
router.post('',newBatchValidator,userAuth,roleCheck,batchController.createNewBatch);

//route for  add new Engineer
router.put('/addEngineers',userAuth,roleCheck,batchController.addNewEngineer);



export default router;
