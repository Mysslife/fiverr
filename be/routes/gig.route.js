import express from "express";
import { verifyToken } from "../middleware/jwt.js"
import { createGig, deleteGig, getGig, getAllGigs } from '../controllers/gig.controller.js'

const router = express.Router();

// doCreate 
router.post("/", verifyToken, createGig)

// doDelete 
router.delete("/:id", verifyToken, deleteGig)

// doGet single gig 
router.get("/single/:id", getGig)

// doGet all gigs
router.get("/", getAllGigs)

export default router;