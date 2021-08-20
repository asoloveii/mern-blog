const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './client/public/uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

const uploads = multer({ storage: storage })

module.exports = uploads
