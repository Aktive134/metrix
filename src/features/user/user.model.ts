import mongoose from 'mongoose';
import { NextFunction } from 'express';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: null
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

// userSchema.post('save', (error: Error, doc: any, next: (err?: Error) => void) => {
//   if ((error as any).code === 11000) {
//       next(new Error('Username already exists'));
//   } else {
//       next(error);
//   }
// });

export default User;
