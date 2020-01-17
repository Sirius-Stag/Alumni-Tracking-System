const mongoose = require("mongoose");

const CollegeProfileSchema = new mongoose.Schema({
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "college"
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  collegeId: {
    type: String,
    required: true,
    unique: true
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
    required: true
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
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = CollegeProfile = mongoose.model(
  "collegeprofile",
  CollegeProfileSchema
);
