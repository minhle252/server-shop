const mongoose = require("mongoose");

const Address = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("address", Address);
