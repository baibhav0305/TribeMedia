const router = require("express").Router();
const { protectedRoutes } = require("../middleware/auth");
const {
  getPosts,
  getUserPosts,
  likePost,
  createPost,
  deletePost,
} = require("../controllers/post");

router.get("/", protectedRoutes, getPosts);
router.get("/:userId/posts", protectedRoutes, getUserPosts);
router.post("/", protectedRoutes, createPost);
router.patch("/:id/like", protectedRoutes, likePost);
router.delete("/:id", protectedRoutes, deletePost);

module.exports = router;
