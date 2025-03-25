const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    name:{
        type:String
    },
    // userId:{
    //     type:Schema.Types.ObjectId,
    //     required:true,
    //     ref:"users"
    // },
    CategoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    discription:{
        type: String
    }
})

module.exports = mongoose.model("SubCategory", SubCategorySchema)