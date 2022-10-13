const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const Address = require("../models/Address");

class OrderController {
  // get all orders
  async getOrder(req, res) {
    try {
      const orders = await Order.find({})
        .sort({ createdAt: "desc" })
        .populate("user_id", ["email"])
        .populate("address_id")
        .populate("product_list._id", ["name", "image", "price"]);
      return res.json({ data: orders });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  // get order by id
  async getOrderById(req, res) {
    try {
      const order = await Order.findById({ _id: req.params.id }).populate(
        "product_list._id",
        ["name", "description", "image", "price"]
      );
      return res.json({ success: true, data: order });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  // get order by user id
  async getOrderByUser(req, res) {
    const user_id = req.userId;
    try {
      const order = await Order.findOne({ user_id })
        .sort({ createdAt: "desc" })
        .populate("product_list._id", ["name", "description", "image", "price"])
        .populate("address_id", ["fullName", "address", "phoneNumber", "city"]);
      // .populate("product")
      res.json({
        success: true,
        message: "get order successfully",
        data: order,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  //  get all orders by user
  async getAllOrderByUser(req, res) {
    const user_id = req.userId;
    try {
      const order = await Order.find({ user_id })
        .sort({ createdAt: "desc" })
        .populate("product_list._id", [
          "name",
          "description",
          "image",
          "price",
        ]);
      // .populate("product")
      res.json({
        success: true,
        message: "get order successfully",
        data: order,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  //  get all orders by user Id
  async getAllOrderByUserId(req, res) {
    const user_id = req.params.id;
    try {
      const order = await Order.find({ user_id })
        .sort({ createdAt: "desc" })
        .populate("product_list._id", [
          "name",
          "description",
          "image",
          "price",
        ]);
      // .populate("product")
      res.json({
        success: true,
        message: "get order successfully",
        data: order,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  // add order
  async addOrder(req, res) {
    const user_id = req.userId;
    const data = req.body;
    // console.log(data);

    try {
      // const user = await User.findById(user_id).lean();

      // if (!user) {
      //   return res.status(400).send({ message: "User is not found" });
      // }
      if (!data) {
        return res.status(400).send({ message: "Product is required!" });
      }
      const address = await Address.findOne({ user_id }).lean();
      // console.log(address);

      // delete cart item
      // await Cart.deleteMany({
      //   $and: [{ user_id }, { product_id: { $in: data.product_id } }],
      // });
      //  update product when order successfully

      // total
      // const amount_total = data.reduce(
      //   (prev, curr) => curr.price.price + prev,
      //   0
      // );

      // const products = data.map((product) => {
      //   return { _id: product._id, quantity: product.quantity };
      // });

      const orderSaved = new Order({
        product_list: data,
        address_id: address._id,
        user_id,
      });
      await orderSaved.save();

      data.map(async (product) => {
        await Product.findByIdAndUpdate(product._id, {
          $inc: { countInStock: -product.quantity },
        });
      });

      return res.json({
        success: true,
        message: "Order successfully",
        data: {
          _id: orderSaved._id,
          user_id,
          name: address.name,
          address: address.full_address,
          city: address.city,

          status: orderSaved.status,
          // product_list: productList,
        },
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
}

module.exports = new OrderController();
