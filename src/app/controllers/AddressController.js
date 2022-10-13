const Address = require("../models/Address");

class AddressController {
  async addAddress(req, res) {
    const { fullName, address, phoneNumber, city } = req.body;
    const user_id = req.userId;

    if (!fullName) {
      res
        .status(400)
        .json({ success: false, message: `Full name is requied!` });
    }
    if (!address) {
      res.status(400).json({ success: false, message: `Address is requied!` });
    }
    if (!phoneNumber) {
      res
        .status(400)
        .json({ success: false, message: `Phone Number is requied!` });
    }
    if (!city) {
      res.status(400).json({ success: false, message: `City is requied!` });
    }
    try {
      const newAddress = new Address({
        fullName,
        address,
        phoneNumber,
        city,
        user_id,
      });
      await newAddress.save();
      res.json({
        success: true,
        message: "Address added successfully",
        data: newAddress,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async getAllAddress(req, res) {
    try {
      const address = await Address.find({});

      res.json({ success: true, data: address });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async getAddressByUserId(req, res) {
    const user_id = req.userId;
    try {
      const address = await Address.findOne({ user_id });
      res.json({ success: true, data: address });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async updateAddress(req, res) {
    // console.log(req.params.id);
    const user_id = req.userId;

    try {
      const address = await Address.findOne({ user_id });

      const updateAddress = await Address.findByIdAndUpdate(
        address._id,
        req.body,
        {
          new: true,
        }
      );

      res.json({
        success: true,
        message: "Address update successfully!",
        data: updateAddress,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
  async deleteAddress(req, res) {
    const { _id } = req.params.id;
    try {
      await Address.findByIdAndDelete(_id);
      res.json({
        success: true,
        message: "Address delete successfully!",
        data: _id,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
}
module.exports = new AddressController();
