import mongoose from 'mongoose';

const subscriptionLinkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const SubscriptionLink = mongoose.model('SubscriptionLink', subscriptionLinkSchema);

export default SubscriptionLink;
