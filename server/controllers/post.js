const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");

// create post
const createPost = async (req, res) => {
  try {
    const { _id: userId, post: description, imageUrl: picturePath } = req.body;
    const user = await User.findById(userId);
    await Post.create({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get posts
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page || "0");
    const size = 4;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(size)
      .skip(size * page);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get user post
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page || "0");
    const size = 5;

    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .limit(size)
      .skip(size * page);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// like post
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentUserId: userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id, { new: true });

    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPosts, getUserPosts, likePost, deletePost };
