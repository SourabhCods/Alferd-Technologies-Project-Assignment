import { model,Schema } from "mongoose";

const cardSchema = new Schema({
    number : {
        type : Number
    },
})

const Card = model('Card' , cardSchema)

export default Card