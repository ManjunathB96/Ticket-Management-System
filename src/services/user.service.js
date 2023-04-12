import User from '../models/user.model';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const userRegistration = async (body) => {
  const result = await User.findOne({ email: body.email });
  if (result == null) {
    const saltRounds = 10;
    const hashPwd = bcrypt.hashSync(body.password, saltRounds);
    body.password = hashPwd;
    const data = await User.create(body);
    return data;
  } else {
    throw new Error('User already exist');
  }
};

//user login
export const userLogin = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (!data) {
    throw new Error('Invalid email id');
  }
  if (!bcrypt.compareSync(body.password, data.password)) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ email: data.email, role: data.role, _id: data._id }, process.env.SECRET_KEY);
  return token;
};
