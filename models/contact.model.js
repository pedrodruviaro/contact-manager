const mongoose = require("mongoose")

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please provide the contact email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide the contact phone"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Contact", contactSchema)
