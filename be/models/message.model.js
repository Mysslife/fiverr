import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  conversationId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  senderPp: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});

export default mongoose.model("Message", messageSchema)
