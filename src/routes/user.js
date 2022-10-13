const express = require("express");
const UserController = require("../app/controllers/UserController");
const router = express.Router();
const { verifyToken } = require("../app/middlewares/auth");

router.get("/get-all-user", UserController.getAllUsers);
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/delete/:id", UserController.deleteUser);
router.get("/user-profile", verifyToken, UserController.userProfile);
router.post(
  "/update-user-profile/:id",
  verifyToken,
  UserController.updateUserProfile
);

module.exports = router;
