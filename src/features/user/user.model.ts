import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required:  [true, 'Please provide a username']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
    },
    link: {
      type: String,
      required: [true, 'Please provide a youtube link'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.model('User', userSchema)
export default User
