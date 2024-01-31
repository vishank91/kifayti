const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"User Full Name Must Required"]
    },
    username:{
        type:String,
        required:[true,"User Name Must Required"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email Address Must Required"],
        unique:true
    },
    phone:{
        type:String,
        required:[true,"Phone Number Must Required"]
    },
    password:{
        type:String,
        required:[true,"Password Must Required"]
    },
    role:{
        type:String,
        default:"Buyer"
    },
    address:{
        type:String,
        default:""
    },
    pin:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    pic:{
        type:String,
        default:""
    },
    otp:{
        type:Number
    }
})
const User = new mongoose.model("User",UserSchema)
module.exports = User