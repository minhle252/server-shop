const mongoose = require("mongoose");
const { Schema } = mongoose;

const Order = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    address_id: { type: Schema.Types.ObjectId, required: true, ref: "address" },
    product_list: [
      {
        _id: { type: Schema.Types.ObjectId, required: true, ref: "product" },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    status: {
      type: String,
      enum: ["Receive", "Confirm", "Delivery", "Complete"],
      default: "Receive",
    },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", Order);

// user_id: {
//   type: mongoose.Schema.Types.ObjectId,
//   required: true,
//   ref: "User",
// },
// orderItems: [
//   {
//     name: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     image: { type: String, required: true },
//     price: { type: Number, required: true },
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Product",
//     },
//   },
// ],
// shippingAddress: {
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   postalCode: { type: String, required: true },
//   country: { type: String, required: true },
// },
// paymentMethod: { type: String, required: true, default: "Paypal" },
// paymentResult: {
//   id: { type: String },
//   status: { type: String },
//   update_time: { type: String },
//   email_address: { type: String },
// },
// shippingPrice: { type: Number, required: true, default: 0.0 },
// totalPrice: { type: Number, required: true, default: 0.0 },
// isPaid: { type: Boolean, required: true, default: false },
// paidAt: { type: Date },
// isDelivered: { type: Boolean, required: true, default: false },
// deliveredAt: { type: Date },
