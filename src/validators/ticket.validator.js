import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const ticketValidator = (req, res, next) => {
  const schema = Joi.object({
    raisedBy:Joi.string().optional(),
    CIC_Id: Joi.string().optional(),
    ticketName: Joi.string().required(),
    engineerName: Joi.string().optional(),
    issueType: Joi.string().required(),
    description: Joi.string().required(),
    additionInfo: Joi.string().optional(),
    file: Joi.string().optional(),
    status: Joi.string().required(),
    assignedTo: Joi.string().optional()
 
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
