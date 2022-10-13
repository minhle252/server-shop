const User = require("../models/User");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

class UserController {
  async getAllUsers(req, res) {
    const PAGE_SIZE = 5;
    var page = req.query.page;
    if (page) {
      page = parseInt(page);
      const skipped = (page - 1) * PAGE_SIZE;
      try {
        const user = await User.find({}).skip(skipped).limit(PAGE_SIZE);
        const total = await User.countDocuments();
        const pageTotal = Math.ceil(total / PAGE_SIZE);
        return res.json({ pageTotal, user });
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .send({ success: false, message: "internet server error" });
      }
    } else {
      try {
        const user = await User.find();
        return res.send(user);
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .send({ success: false, message: "internet server error" });
      }
    }
  }
  async register(req, res) {
    const { username, password, avatar, email, _is_admin } = req.body;
    if (!username && !password) {
      return res
        .status(400)
        .send({ success: false, message: "Missing username or password" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Email is required" });
    }
    try {
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).send({
          success: true,
          message: `Username ${username} allready exists`,
        });
      }
      const hashedPassword = await argon2.hash(password);
      const newUser = await User({
        username,
        password: hashedPassword,
        email,
        avatar,
        _is_admin,
      });
      await newUser.save();
      return res.status(200).send({ success: true, newUser });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  //   login
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "Missing username or password",
      });
    }
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).send({
          success: false,
          message: "Incorrect username or password",
        });
      }
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res.status(400).send({
          success: false,
          message: "Incorrect username or password",
        });
      }
      const accessToken = jwt.sign(
        { UserId: user._id },
        process.env.JWT_SECRET
      );
      res.json({
        success: true,
        message: "Access token",
        accessToken,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async deleteUser(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.json({ success: true, message: "User deleted" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async changePassword(req, res) {
    // const _user_id = req.body?.params?.userId;
    const user_id = _user_id ? _user_id : req.body.userId;
    const { current_password, new_password } = req.body;

    try {
      const user = await User.findById(user_id).lean();
      if (!user) {
        return res.status(401).send({ message: "User does not exist!" });
      }
      const isCorrectPassword = await argon2.compare(
        current_password,
        user.password
      );
      if (current_password === new_password) {
        return res
          .status(401)
          .send({ message: "New password cannot be duplicated!" });
      }
      if (!isCorrectPassword) {
        return res.status(401).send({ message: "Incorrect password!" });
      }
      const hashedPassword = await argon2.hash(new_password, 10);

      await User.findOneAndUpdate(
        { _id: user._id },
        { password: hashedPassword },
        { new: true }
      );

      return res.json({ message: "Change password successfully!" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  //  user Profile
  async userProfile(req, res) {
    try {
      const user = await User.findById(req.userId);
      return res.json({ success: true, message: "ok", data: user });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async updateUserProfile(req, res) {
    const { username, email } = req.body;
    try {
      const updateProfile = User({
        username,
        email,
      });
      if (!updateProfile) {
        return res.status(400).json({
          success: false,
          message: "Product not found or user not authorised",
        });
      }
      await User.findByIdAndUpdate({ _id: req.params.id }, updateProfile, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        message: `Changed user profile ${req.params.id}`,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
}

module.exports = new UserController();
