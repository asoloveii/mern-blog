const { Schema, model } = require("mongoose")

const Post = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true, minLength: 50 },
  likes: [{ type: String }],
  photo: { type: String, required: true },
  category: { type: String }
}, { timestamps: true })

module.exports = model("Post", Post)