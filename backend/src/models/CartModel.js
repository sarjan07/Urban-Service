const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CartSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:"users"
    },
    // cartId:{
    //     type:String,
    //     required:true,
    //     ref:"City",
    // },
    packageId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:"Package"
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Cart", CartSchema)