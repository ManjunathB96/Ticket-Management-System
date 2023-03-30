import Joi from '@hapi/joi';

export const newBatchValidator = (req, res, next) => {
  const schema = Joi.object({
    batchName: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    batchTechType: Joi.string().required(),
    practiceHead: Joi.string().required(),
    mainMentor: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};


/*
/*

 batchName: {
          type: String
        },
        startDate: {
          type: String
        },
        endDate: {
          type: String
        },
        batchTechType: {
          type: String
        },
        practiceHead: {
          type: String
        },
        mainMentor: {
          type: String
        }
*/


/*
   BatchName: body.BatchName,
      startDate: body.startDate,
      endDate: body.endDate,
      books: [
        {
          CIC_ID: cicId,
          fullName: body.fullName,
          phoneNumber: body.phoneNumber,
          email: body.email,
          status: body.status
        }
      ]
    });
*/