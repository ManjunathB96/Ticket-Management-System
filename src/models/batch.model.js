import { Schema, model } from 'mongoose';

const batchSchema = new Schema(
  {
    createdBy: {
      type: String
    },
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
    },
    engineers: [
      {
        CIC_Id: {
          type: String
        },
        fullName: {
          type: String
        },
        phoneNumber: {
          type: Number
        },
        email: {
          type: String
        },
        status: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Batch', batchSchema);
