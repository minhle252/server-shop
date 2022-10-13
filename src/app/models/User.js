const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String, required: true },
    _is_admin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", User);
// const users = mongoose.model("user", User);
// for (let i = 20; i < 80; i++) {
//   users.create({
//     username: "minh_" + i,
//     password: "123456" + i,
//     email: "minh" + i + "@gmail.com",
//     avatar: "asdas",
//     _is_admin: false,
//   });
// }
// users.create({
//   username: "admin12",
//   password: "1234566",
//   email: "admin13@gmail.com",
//   avatar: "asdas",
//   _is_admin: true,
// });
