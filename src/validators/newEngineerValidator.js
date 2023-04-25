import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newEngineerValidator = (req, res, next) => {
  const schema = Joi.object({
    CIC_Id:Joi.string().optional(),
    fullName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().email().required(),
    status: Joi.string().optional(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};
