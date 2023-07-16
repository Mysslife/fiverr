import express from "express";
import { createReview, getReviews } from '../controllers/review.controller.js'
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router();

// createReview
router.post("/", verifyToken, createReview)

// getReviews
router.get("/:gigId", verifyToken, getReviews)

// deleteReview
// router.delete("/:id", verifyToken, deleteReview)


export default router;