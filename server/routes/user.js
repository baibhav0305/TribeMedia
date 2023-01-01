const router = require("express").Router();
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
} = require("../controllers/user");
const { protectedRoutes } = require("../middleware/auth");

router.get("/:id", protectedRoutes, getUser);
router.get("/:id/friends", protectedRoutes, getUserFriends);
router.patch("/:friendId", protectedRoutes, addRemoveFriend);

module.exports = router;
