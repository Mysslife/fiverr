import Message from "../models/message.model.js"
import Conversation from '../models/conversation.model.js'
import User from '../models/user.model.js'

// create message
export const createMessage = async (req, res, next) => {
  const newMessage = new Message({ // -> giống trong JAVA, khởi tạo đối tượng
    conversationId: req.body.conversationId,
    senderId: req.userId,
    msg: req.body.msg,
  })

  try {
    await Conversation.findOneAndUpdate({
      id: req.body.conversationId,
    },
      {
        $set: {
          readBySeller: req.isSeller, // nếu là seller -> khi nhắn msg xong -> readBySeller = true và readByBuyer = false và ngược lại
          readByBuyer: !req.isSeller,
          lastMessage: req.body.msg
        }
      }, {
      new: true
    })

    // find profile picture of sender:
    const userSender = await User.findById({ _id: req.userId })
    newMessage.senderPp = userSender._doc.img

    const newSavedMessage = await newMessage.save()
    return res.status(200).json(newSavedMessage._doc)
  } catch (err) {
    return next(err)
  }
}

// get messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id }) // find: tìm hết, hoặc tìm hết theo điều kiện (SELECT * || SELECT * WHERE)
    return res.status(200).json(messages)
  } catch (err) {
    return next(err)
  }
}