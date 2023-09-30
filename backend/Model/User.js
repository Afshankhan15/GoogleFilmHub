const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, //
  },
  email_verified: {
    type: Boolean,
    default: false, // Set to false by default --> This field can be set to true if the email has been verified through OAuth2
  },
  verified: {
    type: Boolean,
    default: false, // field to track whether a user account has been fully verified
  },
  profilePicture: {
    type: String, // Store the URL or path to the user's profile picture
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const usermodel = new mongoose.model("usermodel", UserSchema);

module.exports = usermodel;

