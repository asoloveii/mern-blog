const { Router } = require("express")
const CategoryController = require("../controllers/categoryController")

const router = Router()

router.post("/", CategoryController.createCategory)
router.delete("/:name", CategoryController.deleteCategory)

module.exports = router