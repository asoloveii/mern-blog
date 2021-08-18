const User = require("../models/User")

class UsersController {
  async getUser(req, res, next) {
    try {
      const { username } = req.params

      const user = await User.findOne({ username })

      res.status(200).json(user)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }

  async updateUser(req, res, next) {
    if (req.user && req.user.id === req.body.userId) {
      try {
        const { id } = req.params

        await User.findByIdAndUpdate(id, {
          $set: {
            username: req.body.username,
            firstname: req.body.firstname,
            secondname: req.body.secondname,
            email: req.body.email,
            desc: req.body.desc,
            age: req.body.age,
            profilePic: req.file.profilePic
          }
        }, { new: true })

        res.status(200).json({ message: "User has been updated" })
      } catch (e) {
        res.status(400).json({ message: e.message })
      }
    } else {
      res.status(400).json({ message: "You can update only your profile" })
    }
  }

  async deleteUser(req, res, next) {
    if (req.user && req.user.id === req.body.userId) {
      try {
        const { id } = req.params

        await User.findByIdAndDelete(id)

        res.status(200).json({ message: "User has been deleted" })
      } catch (e) {
        res.status(400).json({ message: e.message })
      }
    } else {
      res.status(400).json({ message: "You can delete only your profile" })
    }
  }
}

module.exports = new UsersController