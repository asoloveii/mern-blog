const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const User = require("../models/User")
const sendMail = require("../utils/sendMail")

module.exports = new class AuthController {
  async register(req, res, next) {
    try {
      const { username, email, password, firstname, secondname, age } = req.body
      const profilePic = req.file.profilePic

      const user = new User({ username, email, password, firstname, secondname, age, profilePic })
      await user.save()

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

      res.status(201).json({ message: "User created successful", token })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        res.status(404).json({ message: "User not found" })
      }

      const isPasswordsMatch = user.matchPasswords(password)

      if (!isPasswordsMatch) {
        res.status(400).json({ message: "Invalid password" })
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
      res.status(200).json({ message: "Authenticated successfuly", token })
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async forgotpassword(req, res, next) {
    try {
      const { email } = req.body

      const user = User.findOne({ email })

      if (!user) {
        res.status(404).json({ message: "No user with this email" })
      }

      const resetToken = user.getResetPasswordToken()

      const resetPasswordUrl = `http://localhost:3000/api/resetPassword/${resetToken}`

      const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetPasswordUrl}</a>
        `

      await sendMail({ to: user.email, subject: "assword Reset Request", html: message })

      res.status(200).json({ message: "Email sent" })
    } catch (e) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      res.status(400).json({ message: e })
    }
  }

  async resetpassword(req, res, next) {
    try {
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex")

      const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })

      if (!user) {
        res.status(400).json("Invalid token")
      }

      user.password = req.body.password
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.status(201).json({ message: "Password Updated Success", token })
    } catch (e) {
      res.status(400).json("Server error")
    }
  }
}
