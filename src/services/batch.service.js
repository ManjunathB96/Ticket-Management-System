import Batch from '../models/batch.model';
import * as utils from '../utils/randomCodeGen';

//get all batch
export const getAll = async () => {
  const data = await Batch.find();
  return data;
};

//create new batch
export const createNewBatch = async (body) => {
  const batchDetails = await Batch.findOne({
    'batch.batchName': body.batchName
  });
  if (!batchDetails) {
    const createBatch = await Batch.create({
      createdBy: body.userId,
      batch: body
    });
    return createBatch;
  }
  if (batchDetails) {
    let newBody = { ...batchDetails.batch, ...body };
    let newBatch = await Batch.findOneAndUpdate(
      { 'batch.batchName': body.batchName },
      { batch: newBody },
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
  const enggObj = { CIC_Id: CICId, ...body };
  if (!batchDetails) {
    throw new Error('Batch does not exists');
  }
  let newData;
  let engineers = batchDetails.batch.engineers;
  let enggIdx = engineers.findIndex((eng) => eng.email === enggObj.email);

  if (enggIdx >= 0) {
    engineers.splice(enggIdx, 1, enggObj);
  } else {
    engineers.push(enggObj);
  }
  newData = await Batch.findOneAndUpdate(
    { _id: batchId },
    { 'batch.engineers': engineers },
    { new: true }
  );
  return newData;
};

//get all batch
export const getEngineer = async (CICId) => {
  const batchDetails = await Batch.findOne({ 'batch.engineers.CIC_Id': CICId });
  if (!batchDetails) {
    throw new Error('Engineer does not exists');
  }
  const engineer = batchDetails.batch.engineers.find(
    (eng) => eng.CIC_Id === CICId
  );
  return engineer;
};
