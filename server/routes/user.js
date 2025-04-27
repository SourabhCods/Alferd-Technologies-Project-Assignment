import express from "express";
import { createNewUser , authUser, updateUserCardData, initCards } from "../controllers/user.js";
import { verifyToken } from "../middleware.js";


const router = express.Router()


router.get("/protected", verifyToken, (req, res) => {
    res.json({ msg: `Welcome, ${req.user.username}`})
})

router.post("/initcards", verifyToken, initCards)

// Signup
router.post("/signup", createNewUser)

// Login
router.post("/login", authUser)
router.post("/card" , verifyToken , updateUserCardData)



export default router
