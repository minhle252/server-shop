const express = require("express");
const OrderController = require("../app/controllers/OrderController");
const router = express.Router();
const { verifyToken } = require("../app/middlewares/auth");

router.post("/add-order", verifyToken, OrderController.addOrder);
router.get("/get-order", OrderController.getOrder);
router.get("/get-order-by-id/:id", OrderController.getOrderById);
router.get("/get-order-by-user", verifyToken, OrderController.getOrderByUser);
router.get(
  "/get-all-order-by-user",
  verifyToken,
  OrderController.getAllOrderByUser
);
router.get(
  "/get-all-order-by-user-id/:id",

  OrderController.getAllOrderByUserId
);

module.exports = router;
