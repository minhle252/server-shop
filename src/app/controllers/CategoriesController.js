const Categories = require("../models/Categories");

class CategoriesController {
  async addCagories(req, res) {
    const data = req.body;
    try {
      const newCategories = new Categories({ ...data });
      await newCategories.save();
      return res.json({ succcess: true, data: newCategories });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "internet server error" });
    }
  }
}

module.exports = new CategoriesController();
