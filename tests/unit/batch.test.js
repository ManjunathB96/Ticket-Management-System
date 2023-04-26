import BatchModel from '../../src/models/batch.model';
import * as BatchService from '../../src/services/batch.service';
import chai from 'chai';
import sinon from 'sinon';

const expect = chai.expect;

describe('Create new Batch', function () {
  const batchDetails = {
    batchName: 'CFP-130-NodeJS',
    startDate: '28-April-2023',
    endDate: '2-July-2026',
    batchTechType: 'Fullstack-NodeJS',
    practiceHead: 'Gunjan sir',
    mainMentor: 'Smita Gaikwad'
  };
  describe('create', function () {
    it('should create batch ', async function () {
      const newBatch = sinon.stub(BatchModel, 'create').returns(batchDetails);
      const isBatchPresent = sinon.stub(BatchModel, 'findOne').returns(null);
      const batch = await BatchService.createNewBatch(batchDetails);
      expect(newBatch.calledOnce).to.be.true;
      expect(batch.batchName).to.equal(batchDetails.batchName);
      expect(batch.startDate).to.equal(batchDetails.startDate);
      expect(batch.endDate).to.equal(batchDetails.endDate);
      expect(batch.batchTechType).to.equal(batchDetails.batchTechType);
      expect(batch.practiceHead).to.equal(batchDetails.practiceHead);
      expect(batch.mainMentor).to.equal(batchDetails.mainMentor);
    });
  });
});

describe('Add new Engineer', function () {
  const batchDetails = {
    batchName: 'CFP-130-NodeJS',
    startDate: '28-April-2023',
    endDate: '2-July-2026',
    batchTechType: 'Fullstack-NodeJS',
    practiceHead: 'Gunjan sir',
    mainMentor: 'Smita Gaikwad',
    engineers: []
  };
  const updateBatchDetails = {
    batchName: 'CFP-130-NodeJS',
    startDate: '28-April-2023',
    endDate: '2-July-2026',
    batchTechType: 'Fullstack-NodeJS',
    practiceHead: 'Gunjan sir',
    mainMentor: 'Smita Gaikwad',
    engineers: [
      {
        fullName: 'Tanu Belagavi',
        phoneNumber: '9123456987',
        email: 'tanu123@gmail.com',
        status: 'Active'
      }
    ]
  };
  const engineerDetails = {
    fullName: 'Tanu Belagavi',
    phoneNumber: '9123456987',
    email: 'tanu123@gmail.com',
    status: 'Active'
  };
  describe('add new engineer', function () {
    it('should add a new engineer to the db', async function () {
        const updateBatch = sinon.stub(BatchModel, 'findOneAndUpdate').returns(updateBatchDetails);
      const getBatchDetails = sinon.stub(BatchModel, 'findOne').returns(batchDetails);
      const batch = await BatchService.addNewEngineer('643031011ae51024d45d207c',engineerDetails);
      const engg = batch.engineers.find(
        (engineer) => engineer.fullName == engineerDetails.fullName
      );
      expect(getBatchDetails.calledOnce).to.be.true;
      expect(engg.fullName).to.equal(engineerDetails.fullName);
      expect(engg.phoneNumber).to.equal(engineerDetails.phoneNumber);
      expect(engg.email).to.equal(engineerDetails.email);
      expect(engg.status).to.equal(engineerDetails.status);
    });
  });
});

describe('get all batch details', function () {
  it('should get  batch details', async function () {
    const getBatch = sinon.stub(BatchModel, 'find').returns('');
    const batch = await BatchService.getAllBatchDetails();
    expect(getBatch.calledOnce).to.be.true;
    expect(batch).to.equal('');
  });
});

describe('get engineer  details', function () {
  const engineerDetails = {
    CIC_Id: 'CIC-ID-47663742',
    fullName: 'Tanu Belagavi',
    phoneNumber: '9123456987',
    email: 'tanu123@gmail.com',
    status: 'Active'
  };
  it('should get engineer details', async function () {
    const details = sinon.stub(BatchModel, 'findOne').returns(engineerDetails);
    const enggDetails = await BatchService.getEngineerDetails("CIC-ID-47663742");
    const engineer = details.engineers((eng) => eng.CIC_Id === "CIC-ID-47663742");
    expect(details.calledOnce).to.be.true;
    expect(engineer).to.equal(engineerDetails);
  });
});
