import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';

let token;
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST/newRegistration ', () => {
    it('Given valid user details it should return Created', (done) => {
      const userDetails = {
        fullName: 'Rajesh B',
        role: 'Admin',
        email: 'rajesh123@gmail.com',
        password: 'Rajesh@123'
      };
      request(app)
        .post('/api/v1/users')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

  describe('POST/userLogin', () => {
    it('given valid User Login details it should return 200', (done) => {
      const loginDetails = {
        email: 'rajesh123@gmail.com',
        password: 'Rajesh@123'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .end((err, res) => {
          token = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });

  var cicId;
  var batchId;
  describe('POST/createNewBatch', () => {
    const batchDetails = {
      batchName: 'CFP-130-NodeJS',
      startDate: '28-April-2023',
      endDate: '2-July-2026',
      batchTechType: 'Fullstack-NodeJS',
      practiceHead: 'Gunjan sir',
      mainMentor: 'Smita Gaikwad'
    };
    it('Given batch details should return 201 and create a batch', (done) => {
      request(app)
        .post('/api/v1/batches')
        .set('Authorization', `Bearer ${token}`)
        .send(batchDetails)
        .end((err, res) => {
          batchId = res.body.data._id;
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

  describe('GET/getAllBatchDetails', () => {
    it('get all batch details it should return 200', (done) => {
      request(app)
        .get('/api/v1/batches')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe('PUT/:batchId', () => {
    const engineerDetails = {
      fullName: 'Tanu Belagavi',
      phoneNumber: '9123456987',
      email: 'tanu123@gmail.com',
      status: 'Active'
    };
    it('add engineer using batchId should return 200', (done) => {
      request(app)
        .put(`/api/v1/batches/${batchId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(engineerDetails)
        .end((err, res) => {
        // const arr= res.body.data.engineers;
        //   cicId = arr.includes(arr.CIC_Id[0]) 
        //   console.log("cicId=======",cicId);
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

    describe('GET/getEngineer/:cicId', () => {
    it('get all batch details it should return 200', (done) => {
      request(app)
        .get(`/api/v1/batches/getEngineer/${cicId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
});
