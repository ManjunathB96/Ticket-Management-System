import Batch from '../models/batch.model';
import * as utils from '../utils/randomStrGen';




//get all batch
export const getAll = async () => {
  const data = await Batch.find();
  return data;
};



//create new batch
export const createNewBatch = async (userId, body) => {
  console.log('userId ----', userId);
  console.log('batch name----', body.batchName);

  const batch = await Batch.findOne({ 'batches.batchName': body.batchName });
  console.log('batch=======', batch);
  if (batch == null) {
    const data = await Batch.create({
      userId: userId,
      batches: {
        batchName: body.batchName,
        startDate: body.startDate,
        endDate: body.endDate,
        batchTechType: body.batchTechType,
        practiceHead: body.practiceHead,
        mainMentor: body.mainMentor,
        engineers: []
      }
    });
    return data;
  } else {
    throw new Error('Batch already exists');
  }
};

//customer review
export const addNewEngineer = async (req) => {
  const batchname = req.query.batchName;

  console.log('batchname====', batchname);

  const data = await Batch.findOne({ 'batches.batchName': batchname });

  console.log('data====>', data);

  let cicId = utils.randomeCode();

  console.log('CIC id------>', cicId);

  const obj = {};
  obj['CIC_Id'] = cicId;
  obj['fullName'] = req.body.fullName;
  obj['phoneNumber'] = req.body.phoneNumber;
  obj['email'] = req.body.email;
  obj['status'] = req.body.status;

  console.log('obj-----', obj);

  let newData;
  if (data) {
    let engineers = data.batches.engineers;
    let existingEngineer = engineers.filter((eng) => eng.email === obj.email);
    console.log("existing engg---->",existingEngineer);
    console.log("existing engg---->",existingEngineer.length);

    if (existingEngineer.length) {
      throw new Error('Engineer already exist');
    }
    engineers.push(obj);
    console.log('enggg----', engineers);

    console.log('my data length ----->', data.batches.engineers.length);
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
    console.log('return----', newData);
    return newData;
  }
};
