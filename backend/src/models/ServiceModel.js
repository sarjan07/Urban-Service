const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ServiceSchema = new Schema({

    serviceTitle:{
        type: String
    },
    description:{
        type: String,
    },
    price:{
        type: Number,
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: "Category"
    },
    state:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:"State"
    },
    city:{
        type: Schema.Types.ObjectId,
        ref:"City"
    },
    area:{
        type: Schema.Types.ObjectId,
        ref:"Area"
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Service', ServiceSchema)

 
 // categoryId
// serviceName
// basicDetails