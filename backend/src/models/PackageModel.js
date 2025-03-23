const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PackageSchema = new Schema({
    packagename:{
        type: String,
        required: true,
        unique: true
    },
    basicPrice:{
        type: Number,
        required: true
    },
    tax:{
        type: Number,
        required: true
    },
    // commision:{
    //     type: Number,
    // },
    categoryId:{
        type:Schema.Types.ObjectId,
        required: true,
        ref:"Category"
    },
    status:{
        type: Boolean,
        required: true
    },
    discription:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Package", PackageSchema)