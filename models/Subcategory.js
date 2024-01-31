const mongoose = require("mongoose")

const SubcategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Subcategory Name Must Required"],
        unique:true
    }
})
const Subcategory = new mongoose.model("Subcategory",SubcategorySchema)
module.exports = Subcategory