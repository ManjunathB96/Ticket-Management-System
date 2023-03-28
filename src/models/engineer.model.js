import { Schema, model } from 'mongoose';

const enggSchema = new Schema(
  {
    fullName: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    role: {
      type: String
    },
    active: {
      type: Boolean,
      default:true
    }
  },
  {
    timestamps: true
  }
);

export default model('Engg', enggSchema);