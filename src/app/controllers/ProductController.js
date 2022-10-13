const Product = require("../models/Product");
const Categories = require("../models/Categories");

class ProductController {
  // get all product
  async getAllProducts(req, res) {
    const PAGE_SIZE = 2;
    var page = req.query.page;
    if (page) {
      page = parseInt(page);
      const skipped = (page - 1) * PAGE_SIZE;
      try {
        const product = await Product.find({}).skip(skipped).limit(PAGE_SIZE);
        const total = await Product.countDocuments();
        const pageTotal = Math.round(total / PAGE_SIZE);
        return res.json({ pageTotal, product });
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ success: false, message: "internet server error" });
      }
    } else {
      const product = await Product.find({});
      return res.json({ product });
    }
    try {
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  // get propruct by category
  async getProductByCategories(req, res) {
    const query = req.params.slug;
    try {
      const category = await Categories.findOne({ slug: query });

      const product = await Product.find({ category: category.slug });
      return res.json({ success: true, data: product });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  // get single product
  async singleProduct(req, res) {
    try {
      const product = await Product.findById({ _id: req.params.id });
      return res.json({ product });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ succcess: false, message: "internet server error" });
    }
  }
  async addProduct(req, res) {
    const products = req.body;

    // console.log(products);

    try {
      const newProduct = new Product(products);
      await newProduct.save();
      return res.json({ success: true, newProduct });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async updateProduct(req, res) {
    try {
      // let updateProduct = Product({ ...products });

      // if (!updateProduct) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Product not found or user not authorised",
      //   });
      // }

      const update = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      return res.json({ success: true, data: update });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send({ success: false, message: "internet server error" });
    }
  }
  async deleteProduct(req, res) {
    try {
      const deleteProducts = await Product.findByIdAndDelete(req.params.id);
      // const getNewProduct = await Product.findById(req.params.id);
      return res.json({ success: true, data: deleteProducts });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
}

module.exports = new ProductController();
