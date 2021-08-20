const Category = require("../models/Category")

class CategoryController {
  async createCategory(req, res, next) {
    if (req.body.secretKey === process.env.SECRET_API_KEY) {
      try {
        const category = new Category({ name: req.body.name })
        await category.save()
        res.status(201).json({ message: "category has been created" })
      } catch (e) {
        res.status(400).json({ message: e.message })
      }
    } else {
      res.status(400).json({ message: "You can't create category" })
    }
  }

  async deleteCategory(req, res, next) {
    if (req.body.secretKey === process.env.SECRET_API_KEY) {
      try {
        await Category.findOneAndDelete({ name: req.params.name })
        res.status(201).json({ message: "category has been deleted" })
      } catch (e) {
        res.status(400).json({ message: e.message })
      }
    } else {
      res.status(400).json({ message: "You can't create category" })
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await Category.find()
      res.status(200).json(categories)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }
}

module.exports = new CategoryController