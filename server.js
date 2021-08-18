require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use("/api/auth", require("./routes/auth.routes.js"))
app.use("/api/users", require("./routes/users.routes.js"))
app.use("/api/posts", require("./routes/posts.routes.js"))
app.use("/api/categories", require("./routes/category.routes.js"))

async function start() {
  await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("DB connected!"))

  app.listen(PORT, () => console.log('Server started!'))
}

start()
