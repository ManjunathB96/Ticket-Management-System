import UserModel from '../../src/models/user.model'
import * as UserService from '../../src/services/user.service'
import chai from 'chai' 
import sinon from 'sinon' 
const bcrypt = require('bcrypt');
const expect = chai.expect;

describe("User registration", function() {
  const userDetails = {
    fullName: "Rajesh B",
    role: "Admin",
    email:"rajesh123@gmail.com",
    password: "Rajesh@123"  
  };
  describe("create", function() {
    it("should add a new user to the db", async function() {
      const newUser = sinon.stub(UserModel, "create").returns(userDetails);
     const stub2 = sinon.stub(UserModel, "findOne").returns(null);
      const user = await UserService.userRegistration(userDetails);
      expect(newUser.calledOnce).to.be.true;
      expect(user.fullName).to.equal(userDetails.fullName);
      expect(user.role).to.equal(userDetails.role);
      expect(user.email).to.equal(userDetails.email);
    });
  });
});


describe("User login", function() {
    const userDetails = {
        fullName: "Rajesh B",
        role: "Admin",
        email:"rajesh123@gmail.com",
        password: bcrypt.hashSync("Rajesh@123" , 10) 
      };
      const loginDetails = {
        email:"rajesh123@gmail.com",
        password: bcrypt.hashSync("Rajesh@123" , 10)
      };
   
    describe("login", function() {
      it("should login user", async function() {
        const signinDetails = sinon.stub(UserModel, "findOne").returns(loginDetails);
        const login = await UserService.userLogin(loginDetails);
        expect(signinDetails.calledOnce).to.be.true;
        expect(login.email).to.equal(loginDetails.email);
       // expect(login.password).to.equal(loginDetails.password);
      });
    });
  });