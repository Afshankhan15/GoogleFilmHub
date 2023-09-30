const mongoose = require("mongoose");

const UserSchema2 = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  moviename: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Use String type for URLs
    required: true,
  },
});

const usermodel2 = new mongoose.model("usermodel2", UserSchema2);

module.exports = usermodel2;
