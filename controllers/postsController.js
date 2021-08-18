const Post = require("../models/Post")

class PostsController {
  async createPost(req, res, next) {
    if (req.user && req.user.username === req.body.author) {
      try {
        const { author, title, desc, category } = req.body
        const photo = req.file.postPhoto

        const post = new Post({ author, title, desc, photo, category })

        await post.save()
        res.status(201).json({ message: "Poat has been created" })
      } catch (e) {
        res.status(400).json({ message: e.message })
      }
    } else {
      res.status(400).json({ message: "You are not authorized" })
    }
  }

  async getPost(req, res, next) {
    try {
      const post = await Post.findById(req.params.id)
      res.status(200).json(post)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }

  async getAllPost(req, res, next) {
    try {
      let posts
      if (req.query.cat) {
        posts = await Post.find({ category: cat })
      } else if (req.query.user) {
        posts = await Post.find({ author: user })
      } else {
        posts = await Post.find()
      }

      res.status(200).json(posts)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }

  async updatePost(req, res, next) {
    if (req.user && req.user.username === req.body.author) {
      try {
        const { id } = req.params
        await Post.findByIdAndUpdate(id, {
          $set: {
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            photo: req.file.postPhoto
          }
        })

        res.status(201).json({ message: "Poat has been updated" })
      } catch (e) {
        res.status(400).json({ message: e.message })
      }
    } else {
      res.status(400).json({ message: "You can update only your posts" })
    }
  }

  async deletePost(req, res, next) {
    if (req.user && req.user.username === req.body.author) {
      try {
        const { id } = req.params
        await Post.findByIdAndDelete(id, { $set: req.body })

        res.status(201).json({ message: "Post has been deleted" })
      } catch (e) {
        res.status(400).json({ message: e.message })
      }
    } else {
      res.status(400).json({ message: "You can delete only your posts" })
    }
  }

  async likePost(req, res, next) {
    if (req.user) {
      try {
        const { id } = req.params

        let post = await Post.findById(id)

        if (!post.likes.includes(req.user.id)) {
          post = await Post.findByIdAndUpdate(id, { $push: { likes: req.user.id } })
        } else {
          post = await Post.findByIdAndUpdate(id, { $pull: { likes: req.user.id } })
        }

        await post.save()

        res.status(200).json({ message: "Post has been liked" })
      } catch (e) {
        res.status(400).json({ message: e.message })
      }
    } else {
      res.status(400).json({ message: "You are not authorized" })
    }
  }
}

module.exports = new PostsController