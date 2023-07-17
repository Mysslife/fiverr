import express from "express";
import { verifyToken } from "../middleware/jwt.js"
import { getConversations, getConversation, createConversation, updateConversation } from '../controllers/conversation.controller.js'

const router = express.Router();

// doCreateConversation
router.post("/", verifyToken, createConversation)

// doGetConversations
router.get("/", verifyToken, getConversations)

//  doGetConversation
router.get("/single/:id", verifyToken, getConversation)

// doUpdateConversation
router.put("/:id", verifyToken, updateConversation)

export default router;