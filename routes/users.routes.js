const { Router } = require("express")
const verifyToken = require("../middlewares/verifyToken")
const UsersController = require("../controllers/usersController")
const uploads = require("../middlewares/fileUpload")

const router = Router()

router.put("/:id", [uploads.single("profilePic"), verifyToken], UsersController.updateUser)
router.delete("/:id", verifyToken, UsersController.deleteUser)
router.get("/:username", UsersController.getUser)

module.exports = router