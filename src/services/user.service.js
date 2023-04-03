import User from '../models/user.model';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';


//get all admin/mentor
export const getAll = async () => {
  const data = await User.find();
  return data;
};

//create new admin/mentor
export const registration = async (body) => {
  const result = await User.findOne({ email: body.email });
  if (result == null) {
    const saltRounds = 10;
    const hashPwd = bcrypt.hashSync(body.password, saltRounds);
    body.password = hashPwd;
    const data = await User.create(body);
    return data;
  } else {
    throw new Error('Admin already exist');
  }
};


//create admin/mentor login
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  const isMatch = bcrypt.compareSync(body.password, data.password);
  if (data && isMatch) {
    const token = jwt.sign(
      { email: data.email, role: data.role, _id: data._id },
      process.env.SECRET_KEY
    );
    return token;
  } else {
    throw new Error('Invalid Credentials');
  }
};
