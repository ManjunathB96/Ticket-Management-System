import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
import userModel from '../../src/models/user.model';

import app from '../../src/index';
import batchModel from '../../src/models/batch.model';

var token;
describe('Batch APIs Test', () => {
  beforeEach((done) => {
  
    const clearCollections = async () => {
   
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
     
      const hashPwd = bcrypt.hashSync('Rajesh@123', 10);
     
      const result = await userModel.create({
        fullName: 'Rajesh B',
        role: 'Admin',
        email: 'rajesh123@gmail.com',
        password: hashPwd
      });
  
      token = jwt.sign(
        { email: result.email, role: result.role, _id: result._id },
        process.env.SECRET_KEY
      );

      return token;
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      const token = await clearCollections();
      return token;
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect().then((resolve) => {
        done();
      });
    } else {
      clearCollections().then((resolve) => {
        done();
      });
    }
    //  done();
  });

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
    it('add engineer using batchId should return 200', (done) => {
      const batchDetails = {
        batchName: 'CFP-130-NodeJS',
        startDate: '28-April-2023',
        endDate: '2-July-2026',
        batchTechType: 'Fullstack-NodeJS',
        practiceHead: 'Gunjan sir',
        mainMentor: 'Smita Gaikwad'
      };
      console.log('batch details----', batchDetails);
      batchModel.create(batchDetails).then((reslove) => {
        const batchId = reslove._id;
        const engineerDetails = {
          fullName: 'Tanu Belagavi',
          phoneNumber: '9123456987',
          email: 'tanu123@gmail.com',
          status: 'Active'
        };
        console.log('engg details===', engineerDetails);

        request(app)
          .put(`/api/v1/batches/${batchId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(engineerDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
            done();
          });
      });
    })
  });
});
