import express from "express";
import { createOrder, getOrders } from '../controllers/order.controller.js'
import { verifyToken } from '../middleware/jwt.js'

const router = express.Router();

// doCreate
router.post('/:gigId', verifyToken, createOrder)

// doGetOrders
router.get('/', verifyToken, getOrders)


export default router;