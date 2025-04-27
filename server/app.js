import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routes/user.js'

const app = express()
const port = 5000
//Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse incoming JSON requests

app.use('/user',  userRouter)

// connection of nodejs with mongodb
main()
.then(res => console.log("db connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/assignment');
}



app.listen(port , () => {
    console.log(`Server connected at port ${port}`)
})