const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema =new Schema({
    name:{
        type:String,
        // required: true,
    },

    status:{ 
        type: String,
        enum: ["True", "False"]
    },

    roleId:{
        // type:Schema.Types.ObjectId,
        type: String,
        ref:"roles",
        // required:true
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
    }
})

module.exports = mongoose.model("users",UserSchema)