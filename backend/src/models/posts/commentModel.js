const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comment =
  mongoose.models.comments || mongoose.model("comments", commentSchema);

module.exports = Comment;
