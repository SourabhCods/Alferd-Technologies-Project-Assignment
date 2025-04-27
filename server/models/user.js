import { Schema , model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cards : [
      {
        number : {
          type : Number
        },

        easeFactor : {
          type : Number,
          default : 2.5
        },

        interval : {
          type : Number,
          default : 1
        },

        lastReviewedDate : {
          type : Date
        },
        nextReviewDate : {
          type : Date
        }
      }
    ]
});
  


const User = model('User' , userSchema)

export default User;
