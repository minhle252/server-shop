const Cart = require("../models/Cart");
const Product = require("../models/Product");

class CartController {
  async addToCart(req, res) {
    const data = req.body;
    // console.log(data);

    const user_id = req.userId;
    if (data.quantity < 1) {
      return res.status(400).json({ message: "Product quantity is invalid" });
    }
    try {
      const product = await Product.findById(data._id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      // const getCart = Cart.findOne({
      //   $and: [{ user_id }, { product_id: data._id }],
      // });
      //   console.log(getCart);
      if (
        Cart.findOne({
          $and: [{ user_id }, { product_id: data._id }],
        })
      ) {
        return res
          .status(400)
          .json({ message: "The product already exists in the cart" });
      }

      if (product.countInStock === 0) {
        return res.status(400).json({ message: "Product is out of stock" });
      }
      if (product.countInStock < data.quantity) {
        return res
          .status(400)
          .json({ message: "Quantity of product exceeds quantity in stock" });
      }

      const saveCart = new Cart({
        product_id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        quantity: data.quantity,
        user_id,
      });
      await saveCart.save();
      return res.json({ message: "add to cart successfully", data: saveCart });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }

  async updateCart(req, res) {
    const user_id = req.userId;
    const data = req.body;
    try {
      const product = await Product.findById(data.product_id);

      if (product.countInStock < data.quantity) {
        return res.status(400).send({
          message: "Quantity of product exceeds quantity in stock!",
        });
      }
      if (data._id) {
        await Cart.findByIdAndUpdate(data._id, { $set: data }, { new: true });
      } else if (data.product_id) {
        await Cart.findOneAndUpdate(
          { $and: [{ product_id: data.product_id }, { user_id }] },
          { $set: data },
          { new: true }
        );
      }
      return res.json({ message: "update cart successfully", data });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async deleteCartItem(req, res) {
    const data = req.body;
    try {
      await Cart.deleteOne({ data_id });
      return res.json({ message: "deleted cart item ", data: { data } });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }

  async getCartByUserId(req, res) {
    const user_id = req.userId;
    try {
      const carts = await Cart.find({ user_id })
        .sort({ crateAte: "desc" })
        .lean();
      return res.json({ data: carts });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async getAllCart(req, res) {
    try {
      const carts = await Cart.find();
      return res.json({ data: carts });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
}
module.exports = new CartController();
