const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({

    hoardingDimension:{
        type: String,
        required: true
    },
    hoardingType:{
        enum: ['Unipole', 'Billboard', 'Gantry', 'Digital'],
        type: String,
        required: true
        
    },
    Availablity_Status:{
        type: Boolean,
        required: true,
        default: true
    },
    hourlyRate:{
        type: Number,
        required: true
    },
    hordingURL:{
        type: String,
        required: true
    }
    


},{timestamps: true});
module.exports = mongoose.model('Profile', profileSchema);