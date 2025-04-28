const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide the username"],
    },
    email: {
      type: String,
      required: [true, "Please provide the user email"],
      unique: [true, "This email is already in use"],
    },
    password: {
      type: String,
      required: [true, "Please provide the password"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
