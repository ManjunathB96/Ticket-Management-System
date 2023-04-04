import Joi from '@hapi/joi';

export const newBatchValidator = (req, res, next) => {
  const schema = Joi.object({
    batchName: Joi.string().optional(),
    startDate: Joi.string().optional(),
    endDate: Joi.string().optional(),
    batchTechType: Joi.string().optional(),
    practiceHead: Joi.string().optional(),
    mainMentor: Joi.string().optional(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

