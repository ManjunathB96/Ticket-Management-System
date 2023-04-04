import { Schema, model } from 'mongoose';

const ticketSchema = new Schema(
  {
    Ticket_Id: {
      type: String
    },
    CIC_Id: {
      type: String
    },
    ticketName: {
      type: String
    },
    engineerName: {
      type: String
    },
    issueType: {
      type: String
    },
    description: {
      type: String
    },
    additionInfo: {
      type: String
    },
    file: {
      type: String
    },
    status: {
      type: String
    },
    assignedTo: {
      type: String
    },
    followUp: [
      {
        userId: {
          type: String
        },
        description: {
          type: String
        },
        date: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Ticket', ticketSchema);
