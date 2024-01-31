const mongoose = require("mongoose")

async function getConnect(){
    // await mongoose.connect("mongodb://127.0.0.1:27017/kifayti-server")
    await mongoose.connect("mongodb+srv://vishank:ducat12345@cluster0.lp4dvas.mongodb.net/kifayti")
    console.log("Database is Connected")
}
getConnect()