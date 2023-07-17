import express from "express";
import { verifyToken } from "../middleware/jwt.js"
import { createMessage, getMessages } from '../controllers/message.controller.js'

const router = express.Router();

// doCreateMessage
router.post("/", verifyToken, createMessage)

// doGetMessages
router.get("/single/:id", verifyToken, getMessages)

// doUpdateMessage
// router.put("/:id", verifyToken, updateMessage)

export default router;