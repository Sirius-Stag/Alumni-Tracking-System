const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    collegeId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    deanname: {
        type: String
    },
    deanContact: {
        type: String
    },
    website: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = college = mongoose.model("college", CollegeSchema);
