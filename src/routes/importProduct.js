const express = require("express");
const ImportProductController = require("../app/controllers/ImportProductController");
const router = express.Router();
const { verifyToken } = require("../app/middlewares/auth");

router.post("/add-product", verifyToken, ImportProductController.addProduct);
router.get("/get", verifyToken, ImportProductController.getAll);

module.exports = router;
