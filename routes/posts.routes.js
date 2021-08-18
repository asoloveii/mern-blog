const { Router } = require("express")
const verifyToken = require("../middlewares/verifyToken")
const PostsController = require("../controllers/postsController")
const uploads = require("../middlewares/fileUpload")


const router = Router()

router.post("/", [uploads.single("postPhoto"), verifyToken], PostsController.createPost)
router.put("/:id", [uploads.single("postPhoto"), verifyToken], PostsController.updatePost)
router.delete("/:id", verifyToken, PostsController.deletePost)
router.put("/like/:id", verifyToken, PostsController.likePost)
router.get("/:id", PostsController.getPost)
router.get("/", PostsController.getAllPost)

module.exports = router