const jwt = require("jsonwebtoken")
const User = require("../models/User")

const verifyToken = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const user = await User.findById(decoded.id)

      req.user = user
      next()
    } catch (e) {
      res.status(400).json({ message: "You are not authenticated" })
    }
  } else {
    res.status(400).json({ message: "You are not authenticated" })
  }
}

module.exports = verifyToken