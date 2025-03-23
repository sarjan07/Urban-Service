const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    serviceId:{
        type: String,
        required:true
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: "Category"
    },
    serviceName:{
        type:String,
        required: true
    },
    basicDetails:{
        type: String,
        required: true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Service', ServiceSchema)


// ServiceId
// categoryId
// serviceName
// basicDetails