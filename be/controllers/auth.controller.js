import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js"

// register
export const register = async (req, res, next) => {
  if (!req.body.password) return next(createError(404, "Password is invalid"))

  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).send("User has been created.")
  } catch (err) {
    return next(err)
  }
}

// login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username
    })
    if (!user) return next(createError(404, "User not found"))

    const token = jwt.sign({
      id: user._id,
      isSeller: user.isSeller
    },
      process.env.JWT_KEY,
      {
        // expiresIn: "10s" // -> session token hết hạn trong 10s
      }
    )

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong identity"))

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true, // -> chỉ server mới có quyền tác động đến cookie! client không thể sửa/xóa
      })
      .status(200)
      .send({ ...info, success: true })
  } catch (err) {
    return next(err)
  }
}

// logout
export const logout = async (req, res, next) => {
  res.clearCookie("accessToken", {
    sameSite: "none",
    secure: true
  }).status(200).send({ "success": true, "message": "User has been logged out" })
}