import express from "express";
import { deleteUser, getUser } from '../controllers/user.controller.js'
import { verifyToken } from "../middleware/jwt.js"


const router = express.Router();

// getUser
router.get("/:id", verifyToken, getUser)

// doDelete a user
router.delete("/:id", deleteUser)

export default router;