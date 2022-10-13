const mongoose = require("mongoose");
const { Schema } = mongoose;

const Product = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true, ref: "categories" },
    description: { type: String, required: true, default: "" },
    reviewSchema: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ReviewSchema",
      },
    ],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", Product);
