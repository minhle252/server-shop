const express = require("express");
const CartController = require("../app/controllers/CartController");
const router = express.Router();
const { verifyToken } = require("../app/middlewares/auth");

router.post("/add-to-cart", verifyToken, CartController.addToCart);
router.post("/list-cart-by-user", verifyToken, CartController.getCartByUserId);
router.get("/list-cart", verifyToken, CartController.getAllCart);
router.post("/update-cart", verifyToken, CartController.updateCart);

module.exports = router;
