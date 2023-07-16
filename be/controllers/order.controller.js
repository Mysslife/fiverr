import Order from "../models/order.model.js"
import Gig from "../models/gig.model.js"
import User from '../models/user.model.js'
import createError from "../utils/createError.js"

// create order
export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId)

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId, // -> đối với các sản phẩm (gig) có field userId thì userId này id của seller vì chỉ có seller mới tạo được gigs
      price: gig.price,
      payment_intent: "temporary"
    })

    await newOrder.save();
    res.status(200).send("Created order successfully!")
  } catch (err) {
    return next(err)
  }
}

// get orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }), // -> nếu là người mua, thì list order hiển thị id của seller, nếu là người bán, list order hiển thị id của buyer
      isCompleted: true // -> list order chỉ hiển thị các sản phẩm đã thanh toán
    })

    let orderItems = []

    Promise.all(orders.map(async (order) => { // -> lấy tên của người mua / hoặc người bán tương ứng với mỗi order. Nếu là seller thì lấy tên người mua sản phẩm, nếu là buyer thì lấy tên người bán sản phẩm đó.
      const user = await User.findById(req.isSeller ? order.buyerId : order.sellerId);
      const orderItem = { ...(req.isSeller ? { buyerName: user.username } : { sellerName: user.username }), ...order._doc }
      return orderItem
    })).then(result => {
      orderItems.push(...result)
      return res.status(200).json(orderItems)
    })

    // return res.status(200).send(orders)
  } catch (err) {
    return next(err)
  }
}