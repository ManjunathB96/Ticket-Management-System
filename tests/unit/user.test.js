import { expect } from 'chai';
const sinon = require('sinon');
import * as UserService from '../../src/services/user.service';
import * as userController from '../../src/controllers/user.controller';
const { spy, stub } = require('sinon');
// const chai = require('chai')
// chai.should()

// const faker = require("faker");
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

describe('User Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST, {
        useNewUrlParser: true
      });
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });
  describe('user Registration', function () {
    let status, json, res;
    this.beforeEach(() => {
      status = stub();
      json = spy();
      res = { json, status };
      status.returns(res);
    });
    it('should create new user', async function () {
      const req = {
        body: {
          fullName: 'Manjunath B',
          role: 'Admin',
          email: 'bbelagavi6@gmail.com',
          password: 'Manjunath@123'
        }
      };
      await userController.userRegistration(req, res);
      expect(status.args[0][0]).to.be.equal(201);
      expect(json.args[0][0].data.email).to.equal('bbelagavi6@gmail.com');
    });

      it('user login', async function () {
      //const _id='64474b8d08119c3f584f165c'
      const req = {body: { email: 'bbelagavi6@gmail.com', password: 'Manjunath@123' }};
      await userController.userLogin(req, res);
     // const token = jwt.sign({ email: req.body.email, role: req.body.role,_id:_id }, process.env.SECRET_KEY);
      expect(status.args[0][0]).to.be.equal(202);
    //  expect(json.args[0][0].data).to.equal(token);
    });
  });


});
