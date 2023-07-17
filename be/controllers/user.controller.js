import User from '../models/user.model.js'
import jwt from "jsonwebtoken"
import createError from '../utils/createError.js'

// get a user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id || req.params.id)
    if (!user) return next(createError(404, 'User not found'))

    const { password, ...info } = user._doc

    return res.status(200).json(info)
  } catch (err) {
    return next(err)
  }
}

// get a users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()

    const userItems = users.map(user => {
      const { _id, username, isSeller, ...info } = user._doc
      return { _id, username, isSeller }
    })

    return res.status(200).json(userItems)
  } catch (err) {
    return next(err)
  }
}

// delete a user
export const deleteUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken; // -> accessToken = key name của token khi trả về trình duyệt khi đăng nhập lần đầu tiên thành công
    if (!token) return next(createError(401, "You are not authenticated!"))

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) return next(createError(403, err.message)) // -> token is not valid anymore -> jwt expired

      const user = await User.findById(payload.id);
      if (!user) return next(createError(404, "User not found to take an action"))

      if (req.params.id !== user._id.toString()) { // -> phải thêm .toString vì user._id trong MongoDB là object
        return next(createError(401, "You can delete only your account!"))
      }

      await User.findByIdAndDelete(req.params.id)
      return res.status(200).send({ "message": "Delete account successfully!" })
    })
  } catch (err) {
    return next(err)
  }
}