const ImportProduct = require("../models/ImportProduct");
const User = require("../models/User");
const Product = require("../models/Product");

class ImportProductController {
  async addProduct(req, res) {
    const user_id = req.userId;
    const data = req.body;
    console.log(data);
    try {
      const newProduct = new ImportProduct({ ...data, user_id });
      await newProduct.save();

      await Product.findOneAndUpdate(
        { name: data.productName },
        {
          $inc: { countInStock: +data.quantity },
        }
      );

      res.json({
        success: true,
        message: "added successfully",
        data: newProduct,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async getAll(req, res) {
    try {
      const listData = await ImportProduct.find()
        .populate("user_id", ["username"])
        .sort({ createdAt: "desc" });
      res.json({ success: true, data: listData });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
}

module.exports = new ImportProductController();
