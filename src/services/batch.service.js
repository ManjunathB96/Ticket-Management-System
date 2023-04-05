import Batch from '../models/batch.model';
import * as utils from '../utils/randomCodeGen';

//get all batch
export const getAll = async () => {
  const data = await Batch.find();
  return data;
};

//create new batch
export const createNewBatch = async (userId, body) => {
  const batch = await Batch.findOne({ 'batches.batchName': body.batchName });
  if (batch == null) {
    const data = await Batch.create({
      userId: userId,
      batches: {
        batchName: body.batchName,
        startDate: body.startDate,
        endDate: body.endDate,
        batchTechType: body.batchTechType,
        practiceHead: body.practiceHead,
        mainMentor: body.mainMentor
      }
    });
    return data;
  }
  let newData;
  if (batch) {
    let newBody = { ...batch.batches, ...body };
    newData = await Batch.findOneAndUpdate(
      { 'batches.batchName': body.batchName },
      { batches: newBody },
      { new: true }
    );
    return newData;
  }
};

//add new engineer
export const addNewEngineer = async (req) => {
  const batchname = req.query.batchName;
  const data = await Batch.findOne({ 'batches.batchName': batchname });

  console.log("engg service---->",data);

  let cicId = utils.randomeCode();
  let randomNum = 'CIC-ID-' + cicId;
  const enggObj = {};
  enggObj['CIC_Id'] = randomNum;
  enggObj['fullName'] = req.body.fullName;
  enggObj['phoneNumber'] = req.body.phoneNumber;
  enggObj['email'] = req.body.email;
  enggObj['status'] = req.body.status;

  console.log("engg obj====>",enggObj);

  let newData;
  if (data) {

    let engineers = data.batches.engineers;
    let enggIdx;
    for (let i = 0; i < engineers.length; i++) {
      if (engineers[i].email === enggObj.email) {
        enggIdx = i;
        break;
      }
    }
    if (enggIdx >= 0) {
      console.log("inside if idx---->",enggIdx);
      engineers.splice(enggIdx, 1, enggObj);
    } else {
      engineers.push(enggObj);
    }
    newData = await Batch.updateOne(
      { 'batches.batchName': batchname },
      {
        batches: {
          batchName: data.batches.batchName,
          startDate: data.batches.startDate,
          endDate: data.batches.endDate,
          batchTechType: data.batches.batchTechType,
          practiceHead: data.batches.practiceHead,
          mainMentor: data.batches.mainMentor,
          engineers
        }
      }
    );
    return newData;
  }
};
