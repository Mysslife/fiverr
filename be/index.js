import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import reviewRoute from "./routes/review.route.js"
import orderRoute from "./routes/order.route.js"
import messageRoute from "./routes/message.route.js"
import gigRoute from "./routes/gig.route.js"
import conversationRoute from "./routes/conversation.route.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to Mongodb")
  } catch (err) {
    console.log("connect error: ", err)
  }
}

// -> middleware ở trong index.js sẽ ảnh hưởng tới all request đến các services
// -> middleware ở trong folder middleware sẽ chỉ ảnh hưởng tới một số services nếu sử dụng middleware đó

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // -> phải để là domain "localhost" thì mới set được cookie cho browser, còn để ip thì không được (chưa biết vì sao nhưng đã fix được lỗi không set được cookie)
  credentials: true // -> credentials: true, ở cả server và client, để cả 2 chấp nhận rằng cookies sẽ được includes trong header với CORS. -> https://stackoverflow.com/questions/24687313/what-exactly-does-the-access-control-allow-credentials-header-do#:~:text=Responding%20with%20this%20header%20to,origin%20credentialed%20requests%20to%20work.
}))

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messageRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversations", conversationRoute);

// -> Middleware "Error handling" này sẽ được sử dụng trong catch block với all services
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"

  return res.status(errorStatus).json({ "success": false, "message": errorMessage })
})

app.listen(8800, () => {
  connect()
  console.log("Backend is running")
})