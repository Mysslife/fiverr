import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  gigId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    default: 0,
    enum: [1, 2, 3, 4, 5] // users can only rating the product from 1 - 5
  },
  desc: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model("Review", reviewSchema)
