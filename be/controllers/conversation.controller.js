import Order from "../models/order.model.js"
import User from '../models/user.model.js'
import createError from "../utils/createError.js"

// create order
export const createOrder = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}

// get orders
export const getOrders = async (req, res) => {
    res.send("it works")
}