const express = require("express");
const Post = require("../models/posts/postModel");
const getDataFromToken = require("../utils/getDataFromToken");
const Like = require("../models/posts/likeModel");
const Comment = require("../models/posts/commentModel");

const router = express.Router();

// Create Post
router.post("/create", async (req, res, next) => {
  try {
    const { title, description, img } = req.body;
    const userId = await getDataFromToken(req)?.id;

    const newPost = new Post({
      userId,
      title,
      description,
      img,
    });

    const savedPost = await newPost.save();

    return res.json({
      message: "Post created successfully",
      success: true,
      data: savedPost,
    });
  } catch (error) {
    next(error);
  }
});

// Get Posts
router.get("/all", async (req, res, next) => {
  try {
    const allPosts = await Post.find();

    return res.json({
      message: "Post fetched successfully",
      success: true,
      data: allPosts,
    });
  } catch (error) {
    next(error);
  }
});

// Get Users Posts
router.get("/my-posts", async (req, res, next) => {
  try {
    const userId = await getDataFromToken(req)?.id;

    const allPosts = await Post.find({ userId });

    return res.json({
      message: "Post fetched successfully",
      success: true,
      data: allPosts,
    });
  } catch (error) {
    next(error);
  }
});

// Like/unlike Post
router.post("/like/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const userId = await getDataFromToken(req)?.id;

    const liked = await Like.findOne({ postId, userId });

    if (liked) {
      const result = await Like.deleteOne({ _id: liked._id });
      const likeCount = await Like.countDocuments({ postId });
      res.json({ message: `like removed`, count: likeCount });
    } else {
      const newLike = new Like({ postId, userId });
      await newLike.save();
      const likeCount = await Like.countDocuments({ postId });
      res.json({ message: "liked successfully", count: likeCount });
    }
  } catch (error) {
    next(error);
  }
});

// Get like Count
router.get("/likes/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const likes = await Like.countDocuments({ postId });

    res.json({
      message: "Comment fetched successful",
      likes: likes,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

// Comment on Post
router.post("/comment/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = await getDataFromToken(req)?.id;
    const { comment } = req.body;

    const newComment = new Comment({ postId, userId, comment });
    const savedComment = await newComment.save();

    res.json({
      message: "Comment successful",
      data: savedComment,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

// Get comments
router.get("/comments/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const allComments = await Comment.find({ postId });

    res.json({
      message: "Comment fetched successful",
      data: allComments,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

// Get like Count
router.get("/comment/count/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const count = await Comment.countDocuments({ postId });

    res.json({
      message: "Comment fetched successful",
      comment: count,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
