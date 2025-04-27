import cards from "./data.js";
import Card from "./models/card.js";
import mongoose from "mongoose";

// connection of nodejs with mongodb
main()
.then(res => console.log("db connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/assignment');
}

const addCardsToCollection = async() => {
    try{
        for (const card of cards) {
            const newCard = new Card({
                number: card.number,
            });
            await newCard.save();
        }
        console.log("Okk..")
    }
    catch(e){
        console.log(e)
    }

}

addCardsToCollection()




