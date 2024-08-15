import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      index: true
    },
    active: {
      type: Boolean,
      default: true
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

export default User;
