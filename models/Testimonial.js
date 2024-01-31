const mongoose = require("mongoose")

const TestimonialSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Must Required"]
    },
    profile:{
        type:String,
        required:[true,"Profile Must Required"]
    },
    pic:{
        type:String,
        required:[true,"Pic Must Required"]
    },
    message:{
        type:String,
        required:[true,"Message Must Required"]
    },
})
const Testimonial = new mongoose.model("Testimonial",TestimonialSchema)
module.exports = Testimonial