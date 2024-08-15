import mongoose from 'mongoose';

const userInteractionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    videoLink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VideoLink',
      default: null,
    },
    subscriptionLink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriptionLink',
      default: null,
    },
    interactionType: {
      type: String,
      enum: ['accepted', 'declined'],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const UserInteraction = mongoose.model('UserInteraction', userInteractionSchema);

export default UserInteraction;
