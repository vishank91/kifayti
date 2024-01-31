const mongoose = require("mongoose")

const WishlistSchema = mongoose.Schema({
    userid:{
        type:String,
        required:[true,"User Id Must Required"]
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
    pic:{
        type:String,
        required:[true,"Product Pic Must Required"]
    }
})
const Wishlist = new mongoose.model("Wishlist",WishlistSchema)
module.exports = Wishlist