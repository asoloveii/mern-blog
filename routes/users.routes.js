const { Router } = require("express")
const verifyToken = require("../middlewares/verifyToken")
const UsersController = require("../controllers/usersController")

const router = Router()

router.put("/:id", verifyToken, UsersController.updateUser)
router.delete("/:id", verifyToken, UsersController.deleteUser)
router.get("/:username", UsersController.getUser)

module.exports = router