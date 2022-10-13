const mongoose = require("mongoose");

const ImportProduct = new mongoose.Schema(
  {
    user_id: { type: String, required: true, ref: "user" },
    provider: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("importProduct", ImportProduct);
