require('dotenv').config({ path: "./config.env" })
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("DB connected"))

app.listen(PORT, () => console.log('Server started'))
