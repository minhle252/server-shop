const mongoose = require("mongoose");

const Categories = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", Categories);
