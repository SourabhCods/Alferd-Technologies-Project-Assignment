import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import { calcEaseFactor, calcInterval } from "../utilities.js"

const createNewUser = async (req, res , next) => {
  const { username, password } = req.body
  const existingUser = await User.findOne({ username })
  if (existingUser) return res.status(400).json({ msg: "User exists" })

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashedPassword })
  res.status(201).json({ msg: "User created", user: newUser._id })
}

const authUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
  res.json({ token, userId: user._id })
}

const initCards = async(req,res) => {
  const user_cards = []
  if(req.user.cards.length === 0){ 
  for(let i = 1 ; i <= 100 ; i++){
    const card_Obj = {
      number : i,
      easeFactor : 2.5,
      interval : 1,
      lastReviewedDate : Date.now(),
      nextReviewDate : Date.now()
    }
    user_cards.push(card_Obj)
  }

  const init_user = await User.findByIdAndUpdate(
    req.user._id,
    { cards : user_cards },
    {new : true}
  )
  
  }
  res.send("Successful")
}

const updateUserCardData = async (req, res) => {
  const { card_num, score } = req.body

  const user_Doc = await User.findById(req.user._id)
  const card_obj = user_Doc.cards.find((obj) => obj.number === card_num)

  const prevEf = card_obj.easeFactor
  const prevItl = card_obj.interval

  const newEaseFactor = calcEaseFactor(prevEf, score)
  const newInterval = calcInterval(prevItl, newEaseFactor, score)
  const today = new Date()
  const nextReview = new Date()
  nextReview.setDate(today.getDate() + newInterval)

  const updated_user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        "cards.$[elem].easeFactor": newEaseFactor,
        "cards.$[elem].interval": newInterval,
        "cards.$[elem].lastReviewedDate": today,
        "cards.$[elem].nextReviewDate": nextReview,
      }
    },
    {
      new: true,
      arrayFilters: [{ "elem.number": card_num }]
    }
  )

  const card_data = updated_user.cards.find((obj) => obj.number === card_num)
  res.send(card_data)
}

  



export {
    createNewUser,
    authUser,
    updateUserCardData,
    initCards
}