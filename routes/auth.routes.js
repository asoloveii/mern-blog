const { Router } = require("express")
const AuthContoller = require("../controllers/authController")
const uploads = require("../middlewares/fileUpload")

const router = Router()

router.post("/registration", uploads.single("profilePic"), AuthContoller.register)
router.post("/login", AuthContoller.login)
router.put("/resetpassword/:resetToken", AuthContoller.resetpassword)
router.post("/forgotpassword", AuthContoller.forgotpassword)

module.exports = router