import express from "express";
import { deleteUser } from '../controllers/user.controller.js'

const router = express.Router();

// doDelete a user
router.delete("/:id", deleteUser)

export default router;