const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './client/public/uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, Date.now())
  }
})

const uploads = multer({ storage: storage })

module.exports = uploads
