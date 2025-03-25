const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    // lastName:{
    //     type:String,
    //     required: true,
    // },
    status:{
        type:Boolean,
        default:true
    },
    phone:{
        type:Number,
        required: true,
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles",
        required:true
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
    },
    city:{
        type:Schema.Types.ObjectId,
        unique:true,
        ref:"City"
    },
    state:{
        type:Schema.Types.ObjectId,
        unique:true,
        ref:"State"
    }
})

module.exports = mongoose.model("users",UserSchema)