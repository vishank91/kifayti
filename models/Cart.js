const mongoose = require("mongoose")

const CartSchema = mongoose.Schema({
    userid:{
        type:String,
        required:[true,"User IdMust Required"]
    },
    productid:{
        type:String,
        required:[true,"Product Id Must Required"]
    },
    name:{
        type:String,
        required:[true,"Product Name Must Required"]
    },
    brand:{
        type:String,
        required:[true,"Product Brand Name Must Required"]
    },
    color:{
        type:String,
        required:[true,"Product Color Must Required"]
    },
    size:{
        type:String,
        required:[true,"Product Size Must Required"]
    },
    price:{
        type:Number,
        required:[true,"Product Price Must Required"]
    },
    qty:{
        type:Number,
        required:[true,"Product Quantity Must Required"]
    },
    total:{
        type:Number,
        required:[true,"Product Total Required"]
    },
    pic:{
        type:String,
        required:[true,"Product Pic Must Required"]
    }
})
const Cart = new mongoose.model("Cart",CartSchema)
module.exports = Cart