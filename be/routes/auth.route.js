import express from "express";
import { register, login, logout } from '../controllers/auth.controller.js'

const router = express.Router();

// doRegister
router.post("/register", register)

// doLogin
router.post("/login", login)

// doLogout
router.post("/logout", logout)

export default router;