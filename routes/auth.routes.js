const { Router } = require("express")
const AuthContoller = require("../controllers/auth.controller")

const router = Router()

router.post("/registration", AuthContoller.register)
router.post("/login", AuthContoller.login)
router.put("/resetpassword/:resetToken", AuthContoller.resetpassword)
router.post("/forgotpassword", AuthContoller.forgotpassword)

module.exports = router