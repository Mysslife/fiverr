import Conversation from "../models/conversation.model.js"
import createError from "../utils/createError.js"

// create conversation
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId, // sellerId luôn ở phần đầu
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  })

  try {
    const savedConversation = await newConversation.save();
    return res.status(201).json(savedConversation)
  } catch (err) {
    next(err)
  }
}

// update conversation
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate({
      id: req.params.id
    }, {
      $set: {
        ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }) // -> vì người gửi đã tự động là true, nên người nhận khi click mark as read thì cũng thành true
      },
    },
      { new: true }
    )

    return res.status(200).json(updateConversation)
  } catch (err) {
    return next(err)
  }
}

// get conversation
export const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id })
    if (!conversation) return next(createError(404, "No conversation!"))

    res.status(200).json(conversation)
  } catch (err) {
    return next(err)
  }
}

// get conversations
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }).sort({ updatedAt: -1 })
    return res.status(200).json(conversations)
  } catch (err) {
    return next(err)
  }
}