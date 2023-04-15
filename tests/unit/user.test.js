const bcrypt = require('bcrypt');
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';
import userModel from '../../src/models/user.model';

describe('User APIs Test', () => {
  beforeEach((done) => {
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
    let loginDetails;
    beforeEach((done) => {
      const hashPwd = bcrypt.hashSync('Rajesh@123', 10);
      userModel
        .create({
          fullName: 'Rajesh B',
          role: 'Admin',
          email: 'rajesh123@gmail.com',
          password: hashPwd
        })
        .then((reslove) => {
          loginDetails = {
            email: 'rajesh123@gmail.com',
            password: 'Rajesh@123'
          };
          done();
        });
    });
    it('given valid User Login details it should return 202', (done) => {
      console.log('log details---', loginDetails);
      request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .end((err, res) => {
          console.log('error----', err);
          console.log('response----', res.body);
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });
});
