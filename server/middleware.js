import jwt from "jsonwebtoken"
import User from "./models/user.js"

export const verifyToken = async(req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const loggedInUser = await User.findById(decoded.id).select("-password")
    req.user = loggedInUser
    next()
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" })
  }
}
