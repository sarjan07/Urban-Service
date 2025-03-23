const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AreaSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    cityId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"City",
    },
    zipcode:{
        type: Number,
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Area", AreaSchema)