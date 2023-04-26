import Batch from '../models/batch.model';
import * as utils from '../utils/randomCodeGen';

//get all batch
export const getAllBatchDetails = async () => {
  const data = await Batch.find();
  return data;
};

//create new batch
export const createNewBatch = async (body) => {
  const batchDetails = await Batch.findOne({ batchName: body.batchName });
  if (!batchDetails) {
    body.createdBy = body.userId;
    const createBatch = await Batch.create(body);
    return createBatch;
  }
  if (batchDetails) {
    let newBatch = await Batch.findOneAndUpdate(
      { batchName: body.batchName },
      body,
      { new: true }
    );
    return newBatch;
  }
};

//add new engineer
export const addNewEngineer = async (batchId, body) => {
  const batchDetails = await Batch.findOne({ _id: batchId });
  const randomNum = utils.randomeCode();
  const CICId = 'CIC-ID-' + randomNum;
  body.CIC_Id = CICId;
 
  const engg = batchDetails.engineers.findIndex(
    (eng) => eng.email === body.email
  );
  if (engg >= 0) {
    const updatedBatch = await Batch.findOneAndUpdate(
      { engineers: { $elemMatch: { email: body.email } } },
      { $set: { 'engineers.$': { CIC_Id: body.CIC_Id, ...body } } },{new:true}
    );
    return updatedBatch;
  } else {
    const updatedBatch = await Batch.findOneAndUpdate(
      { _id: batchId },
      { $push: { engineers: { CIC_Id: body.CIC_Id, ...body } } },{new:true}
    );
    return updatedBatch;
  }
};

//get engineer details
export const getEngineerDetails = async (CICId) => {
  const batchDetails = await Batch.findOne({ 'engineers.CIC_Id': CICId });
  if (!batchDetails) {
    throw new Error('Engineer does not exists');
  }
  const engineer = batchDetails.engineers.find((eng) => eng.CIC_Id === CICId);
  return engineer;
};
