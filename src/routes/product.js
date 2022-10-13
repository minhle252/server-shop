const express = require("express");
const ProductController = require("../app/controllers/ProductController");
// const upload = require("../app/middlewares/upload");
const router = express.Router();
const multer = require("multer");
const { verifyToken } = require("../app/middlewares/auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().split(":").join("") + file.originalname);
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|PNG)$/)) {
    req.filevalidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage });

router.get("/get-all-products", ProductController.getAllProducts);
router.get(
  "/get-product-by-categories/:slug",
  ProductController.getProductByCategories
);
router.get("/single-product/:id", ProductController.singleProduct);
router.post(
  "/add-product",

  ProductController.addProduct
);
router.put("/update-product/:id", ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);

module.exports = router;
