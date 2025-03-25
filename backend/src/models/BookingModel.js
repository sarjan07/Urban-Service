const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BookingSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    // packageId:{
    //     type:Schema.Types.ObjectId,
    //     required:true
    // },
    appoinmentDate:{
        type: String,
        required: true,
        
    },
    appoinmentTime:{
        type: String,
        required: true
    },
    tamount:{
        type: Number,
        required: true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Book', BookingSchema)


// bookingId
// userId
// packageId
// appoinmentDate
// appoinmentTime
// totalPrice
// status