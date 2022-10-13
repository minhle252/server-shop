const express = require("express");
const AddressController = require("../app/controllers/AddressController");
const router = express.Router();
const { verifyToken } = require("../app/middlewares/auth");

router.post("/add-address", verifyToken, AddressController.addAddress);
router.get("/get-all-address", AddressController.getAllAddress);
router.get("/get-address", verifyToken, AddressController.getAddressByUserId);
router.put("/update-address", verifyToken, AddressController.updateAddress);

module.exports = router;
