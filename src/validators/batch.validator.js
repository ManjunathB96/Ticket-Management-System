import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newBatchValidator = (req, res, next) => {
  const schema = Joi.object({
    batchName: Joi.string().required(),
    startDate: Joi.string().optional(),
    endDate: Joi.string().optional(),
    batchTechType: Joi.string().required(),
    practiceHead: Joi.string().required(),
    mainMentor: Joi.string().optional()
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
