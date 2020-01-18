const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const RecommendedSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    username:{
        type:String
    },
    college: {
        type: String,
        default: Date.now
    },
    year: {
        type: String
    },
    comapany: {
        type: String
    },
    position: {
        type: String
    },
    location: {
        type: String
    },
    gender: {
        type: String
    },
    branch: {
        type: String
    }
    
    
    
});

const Recommended = mongoose.model('recommended',RecommendedSchema);
module.exports = Recommended;