const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({

    
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true

    },
    profilePicture: {
        type: String, // Store image URL (uploaded to cloud storage)
    }
    
    


},{timestamps: true});
module.exports = mongoose.model('Profile', profileSchema);