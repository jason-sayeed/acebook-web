const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.delete("/:postId", PostsController.deletePost);
router.post("/like", PostsController.likePost);

module.exports = router;
