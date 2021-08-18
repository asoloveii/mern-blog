const { Router } = require("express")
const verifyToken = require("../middlewares/verifyToken")
const PostsController = require("../controllers/postsController")

const router = Router()

router.post("/", verifyToken, PostsController.createPost)
router.put("/:id", verifyToken, PostsController.updatePost)
router.delete("/:id", verifyToken, PostsController.deletePost)
router.put("/like/:id", verifyToken, PostsController.likePost)
router.get("/:id", PostsController.getPost)
router.get("/", PostsController.getAllPost)

module.exports = router