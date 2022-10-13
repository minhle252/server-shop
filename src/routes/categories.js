const express = require("express");
const CategoriesController = require("../app/controllers/CategoriesController");
const router = express.Router();
const { verifyToken } = require("../app/middlewares/auth");

router.post("/add", CategoriesController.addCagories);

module.exports = router;
