import express from 'express';
import * as batchController from '../controllers/batch.controller';
import { newBatchValidator } from '../validators/batch.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { roleCheck } from '../middlewares/roleCheck.middleware';
import { newEngineerValidator } from '../validators/newEngineerValidator';
const router = express.Router();


//route to all batches
router.get('', userAuth, batchController.getAll);

//route to create a new batch
router.post('',newBatchValidator,userAuth,roleCheck,batchController.createNewBatch);

//route for  add new Engineer
router.put('/addEngineers/:batchId',newEngineerValidator,userAuth,roleCheck,batchController.addNewEngineer);

//route to engineer details
router.get('/getEngineer/:cicId', userAuth, batchController.getEngineer);

export default router;
