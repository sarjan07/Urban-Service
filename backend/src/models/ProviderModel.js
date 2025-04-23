const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({

    ProviderName: {
        type: String,
        required: true,
    },
    ProviderEmail: {
        type: String,
        required: true

    },
    ProviderPhone: {
        type: String, // Store image URL (uploaded to cloud storage)
    },
    ProviderState: {
        type: String,
        ref: "State", // Store image URL (uploaded to cloud storage)
    },
    ProviderCity: {
        type: String, 
        ref: "city", // Store image URL (uploaded to cloud storage)
    },
    ProviderAddress: {
        type: String, // Store image URL (uploaded to cloud storage)
    },
    
    
    
},{timestamps: true});
module.exports = mongoose.model('Profile', profileSchema);