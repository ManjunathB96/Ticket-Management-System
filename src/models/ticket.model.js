import { Schema, model } from 'mongoose';

const ticketSchema = new Schema(
  {
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
